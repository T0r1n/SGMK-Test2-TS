import { IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    name: string;
    @IsString()
    disc: string;
    @IsNumber({}, { message: 'Цена должна быть числом' })
    price: number;
    @IsNumber({}, { message: 'Ошибка при указании количества' })
    count: number;
}
