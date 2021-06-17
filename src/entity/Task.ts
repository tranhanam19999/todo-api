import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    taskName: string;

    @Column({nullable: true})
	taskDescription: string;

    @Column({nullable: true})
	userId: number;

    @Column({nullable: true})
	expireDate: string;

    @Column({nullable: true})
    taskStatus: string;

    @Column({nullable: true})
    createdTime: string;

    @Column({nullable: true})
    updatedTime: string;
}
