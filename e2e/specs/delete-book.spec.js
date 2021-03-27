const axios = require('axios');
const { expect } = require('chai');

let response;
const book = {
    "name": "Prueba borrar",
    "author": "Autor Prueba borrar"
};
let id;
let createdbook;
describe("given a created", () => {
    before(async () => {

        response = await axios.post('https://books-icesi-munoz-back.herokuapp.com/books', book);
        id = response.data.id;
        createdbook = response.data;
    })

    describe("When the user wants to delete a book", () => {

        before(async () => {

            response = await axios.delete('https://books-icesi-munoz-back.herokuapp.com/books/' + id);
            response = await axios.get('https://books-icesi-munoz-back.herokuapp.com/books');

        });

        it("then it should return an ok status code", () => {

            expect(response.status).eql(200);
        })

        it("then should not return the book deleted", () => {
            let flag = false;
            for (i = 0; i < response.data.length && !flag; i++) {
                if (response.data[i].name == createdbook.name) {
                    flag = true;
                }

            }
            expect(flag).eql(false);
        })




    });
    describe("When the user wants to delete a book doesnt exist", () => {

        before(async () => {
            responseBefore = await axios.get('https://books-icesi-munoz-back.herokuapp.com/books');
            responseDelete = await axios.delete('https://books-icesi-munoz-back.herokuapp.com/books/' + id + "Juan Pablo");
            responseAfter = await axios.get('https://books-icesi-munoz-back.herokuapp.com/books');


        });

        it("then the software doesnt remove anything", () => {

            expect(responseBefore.data).eql(responseAfter.data);

        })

    });
});