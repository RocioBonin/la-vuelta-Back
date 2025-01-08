import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Role } from "../enum/role.enum";

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({ length: 50 })
    name: string;

    @Column({ length: 50 })
    surname: string;

    @Column({ unique: true })
    idNumber: string;

    @Column()
    repeatPassword: string;

    @Column()
    location: string;

    @Column()
    phone: number;

    @Column({
        default:
          'https://thumbs.dreamstime.com/b/vector-de-perfil-avatar-predeterminado-foto-usuario-medios-sociales-icono-183042379.jpg',
      })
    photo: string;

    @Column()
    birthdate: Date;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: Role, default: Role.User })
    role: Role;

    @Column({default: false})
    newsletter: boolean;
}