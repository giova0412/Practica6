import { model, Schema } from 'mongoose';
import moment from 'moment-timezone';
import { v4 as uuidv4 } from 'uuid';

const sessionSchema = new Schema(
    {
        sessionID: {
            type: String,
            default: () => uuidv4(), // Genera un UUID único
            unique: true, // Campo único
            required: true, // Campo obligatorio
            validate: {
                validator: function (v) {
                    return v !== null && v !== undefined; // Asegura que no sea null o undefined
                },
                message: 'sessionID no puede ser null o undefined', // Mensaje de error personalizado
            },
        },
        email: {
            type: String,
            required: true, // Campo obligatorio
        },
        nickname: {
            type: String,
            required: true, // Campo obligatorio
        },
        createdAt: {
            type: Date,
            default: () => moment().tz('America/Mexico_City').toDate(), // Fecha actual en la zona horaria de México
            required: true, // Campo obligatorio
        },
        lastAccess: {
            type: Date,
            default: () => moment().tz('America/Mexico_City').toDate(), // Fecha actual en la zona horaria de México
            required: true, // Campo obligatorio
        },
        status: {
            type: String,
            enum: [
                'Activa',
                'Inactiva',
                'Finalizada por el Usuario',
                'Finalizada por Error del Sistema',
            ], // Valores permitidos
            default: 'Activa', // Valor por defecto
            required: true, // Campo obligatorio
        },
        clientData: {
            ip: {
                type: String,
                required: true, // Campo obligatorio
            },
            macAddress: {
                type: String,
                required: true, // Campo obligatorio
            },
        },
        serverData: {
            ip: {
                type: String,
                required: true, // Campo obligatorio
            },
            macAddress: {
                type: String,
                required: true, // Campo obligatorio
            },
        },
        inactivityTime: {
            hours: {
                type: Number,
                default: 0, // Valor por defecto
                required: true, // Campo obligatorio
                min: 0, // Valor mínimo
            },
            minutes: {
                type: Number,
                default: 0, // Valor por defecto
                required: true, // Campo obligatorio
                min: 0, // Valor mínimo
                max: 59, // Valor máximo
            },
            seconds: {
                type: Number,
                default: 0, // Valor por defecto
                required: true, // Campo obligatorio
                min: 0, // Valor mínimo
                max: 59, // Valor máximo
            },
        },
        durationTime: {
            hours: {
                type: Number,
                default: 0, // Valor por defecto
                required: true, // Campo obligatorio
                min: 0, // Valor mínimo
            },
            minutes: {
                type: Number,
                default: 0, // Valor por defecto
                required: true, // Campo obligatorio
                min: 0, // Valor mínimo
                max: 59, // Valor máximo
            },
            seconds: {
                type: Number,
                default: 0, // Valor por defecto
                required: true, // Campo obligatorio
                min: 0, // Valor mínimo
                max: 59, // Valor máximo
            },
        },
    },
    {
        versionKey: false, // Desactiva la clave de versión (_v)
        timestamps: false, // Desactiva los timestamps automáticos (createdAt, updatedAt)
    }
);

export default model('Session', sessionSchema); // Exporta el modelo