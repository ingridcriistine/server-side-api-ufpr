const { request } = require("express");
const ContactRepository = require("../repositories/ContactRepository");

class ContactController {

    async index(request, response) {
        //listar todos os registros
        const contacts = await ContactRepository.findAll();
        response.status(200).json(contacts);
    }

    async show(request, response) {
        //mostrar um registro específico
        const {id} = request.params;
        const contact = await ContactRepository.findById(id);

        //verificar se o id enviado na requisição existe
        if(!contact) {
            return response.status(404).json({error: "Contact not found!"});
        }

        response.status(200).json(contact);
    }

    async store(request, response) {
        //criar um novo registro
        const {name, email, phone, category_id} = request.body;
        
        //definindo que o nome deve ser obrigatório
        if(!{name}) {
            return response.status(400).json({error: "Name is required!"});
        }
        
        //definindo que o email deve ser único para cada contato
        if(email) {
            const contactByEmail = await ContactRepository.findByEmail(email)
            if(contactByEmail) {
                return response.status(400).json({error: "This email is already in use!"});
            }
        }
        
        const contact = await ContactRepository.create({
            name, 
            email: email || null, 
            phone: phone || null, 
            category_id: category_id || null
        });

        response.status(200).json(contact);
    }

    async update(request, response) {
        //atualizar um registro
        const {id} = request.params;
        const {name, email, phone, category_id} = request.body;
        const contact = await ContactRepository.update(id, name, email, phone, category_id);
        
        //verificar se o id enviado na requisição existe
        if(!{id}) {
            return response.status(404).json({error: "Contact not found!"});
        }
        
        response.status(200).json(contact);
    }

    async delete(request, response) {
        //deletar um registor
        const{id} = request.params;

        if(!id) {
            return response.status(400).json({error: "Invalid contact id!"});
        }

        await ContactRepository.delete(id);

        response.sendStatus(204);
    }


}

//singleton
module.exports = new ContactController();