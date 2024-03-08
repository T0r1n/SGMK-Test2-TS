import { Link } from "src/links/entities/link.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Characteristic {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Link, (links) => links.idChar)
    link: Link[];
}
