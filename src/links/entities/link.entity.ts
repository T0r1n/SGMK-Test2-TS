import { Characteristic } from "src/characteristic/entities/characteristic.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Link {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product, (product) => product.id)
    idProduct: number;

    @ManyToOne(() => Characteristic, (Char) => Char.id)
    idChar: number;

    @Column()
    value: string;
}
