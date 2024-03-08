const app = new Vue({
    el: '#app',
    data: {
        currentWindow: 0,
        products: [], 
        productName: '', 
        productPrice: 0,
        productDescription: '',
        productCount: 1,
        productCharacteristics: [],
        weight:'',
        color: '',
        expiryDate:'',
        material: '',
        storageConditions: '',
        count: 0,
        selectedOrder: {},
        order: [],
        page: 1,
        totalPages: 1,
        selectedProducts: [],
        totalPrice: null,
        characteristicIds: [], // Массив для хранения выбранных чисел
        weightCheckbox: false,
        colorCheckbox: false,
        expiryDateCheckbox: false,
        materialCheckbox: false,
        storageConditionsCheckbox: false
        
    },
    methods: {
        async showWindow(windowNumber) {
            this.products = [];
            if (windowNumber === 1) {
                this.fetchProducts(); 
            } else if (windowNumber === 2) {
                await this.fetchOrders(); 
                setTimeout(() => {
                    this.openCalendar();
                }, 100);
            }else if (windowNumber === 3){
                this.clientorder(1);
            }
            this.currentWindow = windowNumber;
            
        },
        fetchProducts() {
            fetch('http://localhost:3000/product/all')
                .then(response => response.json())
                .then(data => {
                    this.products = data; 
                })
                .catch(error => {
                    console.error('Ошибка при загрузке товаров:', error);
                });
        },
        async clientorder() {
            try {
                const limitResponse = await fetch('http://localhost:3000/links/getproduct?page=0&limit=0', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ characteristicIds: [] })
                });
    
                const limitData = await limitResponse.json();
                this.totalPages = limitData.length;
    
                const pageNumber = this.page;
                const url = `http://localhost:3000/links/getproduct?page=${pageNumber}&limit=5`;
                const requestData = { characteristicIds: this.characteristicIds }; // Используем свойство characteristicIds
    
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestData)
                });
    
                const data = await response.json();
    
                this.products = data.map(product => ({
                    ...product,
                    count: this.selectedProducts.find(selectedProduct => selectedProduct.id === product.id)
                        ? this.selectedProducts.find(selectedProduct => selectedProduct.id === product.id).count
                        : 0,
                    maxCount: product.count
                }));
            } catch (error) {
                console.error('Ошибка при загрузке товаров:', error);
            }
        },
        nextpage() {
            if (this.page < Math.ceil(this.totalPages / 5)) {
                this.page++;
                this.clientorder();
            }

        },
        prevpage() {
            if (this.page > 1) {
                this.page--;
                this.clientorder();
            }
        },
        increment(product) {
            product.count++;
            product.changed = true;
            if(this.currentWindow === 3){
                this.updateSelectedProducts(product);
                console.log(this.selectedProducts);
            }
        },
        decrement(product) {
            if (product.count > 0) {
                product.count--;
                product.changed = true;
                if(this.currentWindow === 3){
                    this.updateSelectedProducts(product);
                    console.log(this.selectedProducts);
                }
            }
        },
        updateSelectedProducts(product) {
            const index = this.selectedProducts.findIndex(selectedProduct => selectedProduct.id === product.id);
            if (index === -1) {
                this.selectedProducts.push({ id: product.id, count: product.count });
            } else {
                if (product.count === 0) {
                    this.selectedProducts.splice(index, 1);
                } else {
                    this.selectedProducts[index].count = product.count;
                }
            }
        },
        incr() {
            this.productCount++; 
          },
        decr() {
            if (this.productCount > 0) {
              this.productCount--;
            }
          },
          async fetchTotalPrice() {
            try {
                const response = await fetch('http://localhost:3000/product/total', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.selectedProducts)
                });
        
                if (!response.ok) {
                    throw new Error('Ошибка при получении данных о цене');
                }
        
                const data = await response.json();
                console.log('Ответ от сервера:', data);
        
                this.totalPrice = parseInt(data.totalPrice);
                console.log(this.totalPrice);
            } catch (error) {
                console.error('Ошибка:', error.message);
                this.totalPrice = null;
            }
        },
        submitUpdates() {
            const updatedProducts = this.products
                .filter(product => product.changed)
                .map(product => ({ id: product.id, count: product.count }));
        
            console.log('Отправляемые данные:', updatedProducts); 
        
            fetch('http://localhost:3000/product/update-multiple', {
                method: 'PATCH', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedProducts)
            })
            .then(response => {
                console.log('Статус ответа:', response.status); 
                console.log('Тело ответа:', response.json()); 
                if (response.ok) {
                    alert("Данные успешно изменены");
                    console.log('Данные успешно отправлены:', response);
                    this.products.forEach(product => {
                        if (product.changed) {
                            product.changed = false;
                        }
                    });
                } else {
                    throw new Error('Ошибка при отправке данных:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Ошибка при отправке данных:', error);
            });
        },
        submitProduct() {
            const productData = {
                name: this.productName,
                disc: this.productDescription,
                price: parseFloat(this.productPrice),
                count: this.productCount
            };
        
            console.log('Отправляемые данные товара:', productData);
        
            fetch('http://localhost:3000/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Ответ сервера:', data);
                const productId = data.product.id;
                console.log('ID добавленного товара:', productId);
                
        
                const characteristics = [];
        
                if (this.weight) {
                    characteristics.push({ id: 1, value: this.weight });
                }
                if (this.color) {
                    characteristics.push({ id: 2, value: this.color });
                }
                if (this.expiryDate) {
                    characteristics.push({ id: 3, value: this.expiryDate });
                }
                if (this.material) {
                    characteristics.push({ id: 4, value: this.material });
                }
                if (this.storageConditions) {
                    characteristics.push({ id: 4, value: this.storageConditions });
                }

                const characteristicsData = {
                    productId: productId,
                    characteristics: characteristics
                };
        
                console.log('Отправляемые характеристики:', characteristicsData);
        
                fetch('http://localhost:3000/links', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(characteristicsData)
                })
                .then(response => {
                    if (response.ok) {
                        alert("Продукт успешно добавлен");
                        console.log('Характеристики успешно добавлены');
                    } else {
                        throw new Error('Ошибка при добавлении характеристик:', response.statusText);
                    }
                })
                .catch(error => {
                    console.error('Ошибка при добавлении характеристик:', error);
                });
            })
            .catch(error => {
                console.error('Ошибка при создании товара:', error);
            });

            // this.showWindow(1);
        },
            fetchOrders() {
                return fetch('http://localhost:3000/log/all')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Ошибка при загрузке заказов: ' + response.statusText);
                        }
                        return response.json();
                    })
                    .then(data => {
                        this.orders = data;
                    })
                    .catch(error => {
                        console.error(error);
                    });
        },
          formatDate(dateString) {
            const date = new Date(dateString);
            return `${date.toLocaleDateString()}`;
          },
          showOrderDetails(order) {
            this.selectedOrder = order;
            this.currentWindow = 5;
          },
            openCalendar() {
                const self = this;
                flatpickr("#calendar", {
                    mode: "range",
                    dateFormat: "Y-m-d",
                    onClose: function(selectedDates, dateStr, instance) {
                        let startDate = selectedDates[0].toISOString().split('T')[0];
                        let endDate = selectedDates[1].toISOString().split('T')[0];

                        const startDateObj = new Date(selectedDates[0]);
                        startDateObj.setDate(startDateObj.getDate() + 1);
                        startDate = startDateObj.toISOString().split('T')[0];
            
                        const endDateObj = new Date(selectedDates[1]);
                        endDateObj.setDate(endDateObj.getDate() + 1);
                        endDate = endDateObj.toISOString().split('T')[0];
            
                        console.log(startDate, endDate);

                        fetch('http://localhost:3000/log/datesort', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                startDate: startDate,
                                endDate: endDate
                            })
                        })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Ошибка при загрузке данных: ' + response.statusText);
                            }
                            return response.json();
                        })
                        .then(data => {
                            console.log('Ответ от сервера:', data);
                            self.orders = data;
                            self.$forceUpdate();
                            self.currentWindow = 2;
                        })
                        .catch(error => {
                            console.error('Ошибка при загрузке данных:', error);
                        });
                    }
                });
            },
            createOrderJson() {
                const orderItems = [];
                let totalPrice = 0;
        
                this.products.forEach(product => {
                    if (product.count > 0) {
                        orderItems.push({
                            id: product.id,
                            count: product.count
                        });
                        totalPrice += product.price * product.count;
                    }
                });
        
                const orderData = {
                    totalPrice: this.totalPrice,
                    orderItems: this.selectedProducts
                };
                console.log(this.selectedProducts);
        
                fetch('http://localhost:3000/log', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(orderData)
                })
                .then(response => {
                    if (response.ok) {
                        console.log('Данные успешно отправлены на сервер');
                        this.products.forEach(product => {
                            product.count = 0;
                        });
                    } else {
                        throw new Error('Ошибка при отправке данных на сервер:', response.statusText);
                    }
                })
                .catch(error => {
                    console.error('Ошибка при отправке данных на сервер:', error);
                });
                fetch('http://localhost:3000/product/clientord', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.selectedProducts)
                })
                .then(response => {
                    if (response.ok) {
                        console.log('Заказ успешно отправлен на http://localhost:3000/product/clientord');
                        alert("Покупка успешно завершена");
                    } else {
                        throw new Error('Ошибка при отправке заказа:', response.statusText);
                    }
                })
                .catch(error => {
                    console.error('Ошибка при отправке заказа:', error);
                });
                this.selectedProducts = [];
                this.totalPrice = null;
                this.page = 1;
                this.showWindow(2);

            },
        validateInput() {
            this.productPrice = this.productPrice.replace(/\D/g, '');
        },
        addToOrder(product) {
            const index = this.selectedProducts.findIndex(item => item.id === product.id);
            if (index === -1) {
                this.selectedProducts.push({ id: product.id, count: 1 });
            } else {
                this.selectedProducts[index].count++;
            }
        },
        
        removeFromOrder(product) {
            const index = this.selectedProducts.findIndex(item => item.id === product.id);
            if (index !== -1) {
                if (this.selectedProducts[index].count === 1) {
                    this.selectedProducts.splice(index, 1);
                } else {
                    this.selectedProducts[index].count--;
                }
            }
        },
        handleChange(number) {
            if (this.characteristicIds.includes(number)) {
                // Если число уже присутствует в массиве, удаляем его
                const index = this.characteristicIds.indexOf(number);
                if (index !== -1) {
                    this.characteristicIds.splice(index, 1);
                }
            } else {
                // Если число не присутствует в массиве, добавляем его
                this.characteristicIds.push(number);
            }
            console.log('Массив выбранных чисел:', this.characteristicIds);
            this.clientorder(1);

        }
    },
    mounted() {
        this.openCalendar();
        
    }
});

Vue.component('order-list', {
    props: {
      orders: Array
    },
    template: `
      <div>
        <div v-for="order in orders" :key="order.id" @click="showOrderDetails(order)" style="cursor: pointer;">
          <p>{{ formatDate(order.date) }} | № {{ order.id }} | {{ order.totalPrice }}р.</p>
        </div>
      </div>
    `,
    methods: {
      formatDate(dateString) {
        const date = new Date(dateString);
        return `${date.toLocaleDateString()}`;
      },
      showOrderDetails(order) {
        this.$emit('show-order-details', order);
      }
    }
});