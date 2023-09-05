// Importar NodeFetch
import fetch from "node-fetch";
import { toConvertBase64 } from "../../helpers/convert-base64.js";
import Person from "../../models/Person.js";

// Función para crear una persona en Alfresco
const createAlfrescoPerson = async ({ ticket, personData }) => {
    const URL_CORE_API = process.env.URL_CORE_API;
    const URL_HOST = process.env.URL_HOST;
    try {
        const token = toConvertBase64(ticket);
        const { id, firstName, lastName, email, password, skypeId, jobTitle } =
            personData;
        // "id" es el username de alfresco
        if (!id || !firstName || !lastName || !email || !password || !skypeId || !jobTitle) {
            t
            return {
                ok: false,
                msg: "Ocurrió algo con el servidor"
            }
        }
        // Enviar la persona a Alfresco
        const response = await fetch(
            `http://${URL_HOST}:8080/${URL_CORE_API}/people`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Basic ${token}`,
                },
                body: JSON.stringify({ id, firstName, lastName, email, password, skypeId, jobTitle }), // Enviar los datos de la persona a Alfresco
            }
        );

        const data = await response.json();
        console.log(data);

        return data;
    } catch (error) {
        console.log(error);
    }
};

// Autenticar Usuario
export const getAlfrescoPeople = async ({ ticket }) => {
    try {
        const URL_CORE_API = process.env.URL_CORE_API;
        const URL_HOST = process.env.URL_HOST;

        const token = toConvertBase64(ticket);
        // console.log(token);
        const response = await fetch(
            `http://${URL_HOST}:8080/${URL_CORE_API}/people`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Basic ${token}`,
                },
            }
        );
        const data = await response.json();
        // console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
};


const getAlfrescoPeopleActivities = async({ticket, userId})=>{

    try {
        const URL_CORE_API = process.env.URL_CORE_API;
        const URL_HOST = process.env.URL_HOST;

        const token = toConvertBase64(ticket)

        const response = await fetch(
            `http://${URL_HOST}:8080/${URL_CORE_API}/people/${userId}/activities`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Basic ${token}`,
                },
            }
        );
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error)
        
    }


}

export const getPeople = async ({ ticket }) => {
    try {
        const people = await getAlfrescoPeople({ ticket });

        if (!people) {
            return {
                ok: false,
                status: 404,
                msg: "No hay people",
            };
        }
        
        const ourPeople = Person.find()
        return {
            ok: true,
            status: 200,
            msg: "people:",
            people,
            mongo: ourPeople
        };
    } catch (error) {
        console.error("Error:", error);
        return {
            ok: false,
            status: 500,
            msg: "Error al obtener la persona y crearla en Mongoose"
        };
    }
};

export const createPerson = async ({ ticket, personData }) => {
    try {
        const { id, firstName, lastName, email, password, skypeId, jobTitle } =
            personData;

        // Validar los datos de entrada
        if (!id || !firstName || !lastName || !email || !password) {
            return {
                ok: false,
                status: 400,
                msg: "Los campos obligatorios son requeridos."
            };
        }

        // Crear la persona en Alfresco
        const alfrescoPerson = await createAlfrescoPerson({
            ticket, personData: {
                id,
                firstName,
                lastName,
                email,
                password,
                skypeId,
                jobTitle,
            }
        });

        if (!alfrescoPerson) {
            return {
                ok: false,
                status: 404,
                msg: "No se encontró la persona en Alfresco."
            }
        }
        // Crear la persona en Mongoose utilizando los datos de Alfresco
        const newPerson = new Person({ ...alfrescoPerson.entry, password });

        await newPerson.save(); // Guardar la persona en la base de datos de Mongoose

        return {
            ok: true,
            status: 201,
            msg: "Person creada en Alfresco y Mongoose:",
            alfrescoPerson,
            newPerson,
        };
    } catch (error) {
        console.error("Error:", error.message);
        return {
            ok: false,
            status: 500,
            msg: "Error al procesar la solicitud"
        };
    }
};


export const getPeopleActivities = async ({ticket, userId})=>{
    try {
        if(!userId){
            return({
                ok: false,
                msg: "Faltan datos requeridos"
            })
        }

        const peopleActivities = await getAlfrescoPeopleActivities({ticket, userId})

        if(!peopleActivities){
            return({
                ok: false,
                status: 404,
                msg: "No se han encontrado registros"
            })
        }

        return({
            ok: true,
            status: 201,
            peopleActivities
        })


    } catch (error) {
        return({
            ok: false,
            status: 500,
            msg: "error al procesar la solicitud"
        })
        
    }
}