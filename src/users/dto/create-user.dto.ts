import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../enum/role.enum';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'John',
    description:
      'Indica el nombre del usuario, debe tener como mínimo 3 caracteres.',
  })
  @IsString()
  @Length(3, 80)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'Doe',
    description:
      'Indica el apellido del usuario, debe tener como mínimo 3 caracteres',
  })
  @IsString()
  @Length(3, 80)
  @IsNotEmpty()
  surname: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'john@example.com',
    description:
      'Correo electrónico del usuario, debe cumplir con la estructura de un email.',
  })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Número de identificación del usuario',
    example: '12345678',
  })
  @IsString()
  @IsNotEmpty()
  idNumber: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Contraseña del usuario',
    example: 'Password123!',
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[=!@#$%^&*])[A-Za-z\d=!@#$%^&*]{8,15}$/,
    {
      message:
        'La contraseña debe contener al menos una minúscula, una mayúscula, un número, un caracter especial (= !@#$%^&*) y tener entre 8 y 15 caracteres',
    },
  )
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Localidad del usuario',
    example: 'Argentina',
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'Número de télefono',
    example: '1134256282',
  })
  @IsNumber()
  @IsNotEmpty()
  phone: number;

  @ApiProperty({
    required: false,
    default:
      'https://thumbs.dreamstime.com/b/vector-de-perfil-avatar-predeterminado-foto-usuario-medios-sociales-icono-183042379.jpg',
    description: 'Imagen de perfil del usuario',
  })
  @IsString()
  @IsOptional()
  photo?: string;

  @ApiProperty({
    required: true,
    description: 'Fecha de nacimiento del usuario',
    example: '2025-01-03',
  })
  @IsDateString()
  birthdate: Date;

  @ApiProperty({
    enum: Role,
    description: 'Rol asignado al usuario',
    default: Role.User,
    example: Role.User,
  })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @ApiProperty({
    type: Boolean,
    required: false,
    description: 'Indica si el usuario esta suscripto al newsletter',
    default: false,
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  newsletter?: boolean;
}
