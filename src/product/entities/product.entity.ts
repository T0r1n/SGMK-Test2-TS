import { Characteristic } from "src/characteristic/entities/characteristic.entity";
import { Link } from "src/links/entities/link.entity";

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    disc: string;

    @Column()
    price: number;

    @Column()
    count: number;

    @OneToMany(() => Link, (links) => links.idProduct)
    link: Link[];

}
