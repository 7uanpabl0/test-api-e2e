const axios = require('axios');
const { expect } = require('chai');

let response;
const book = {
    "name": "Prueba creada",
    "author": "Autor Prueba"
};
const badBook = {
    "name": "Harry Potter",
    "author": book
};
let createdbook;
describe("when the user wants to create a book", () => {
    before(async () => {

        response = await axios.post('https://books-icesi-munoz-back.herokuapp.com/books', book);
        createdbook = response.data;
    });

    it("then it should return an ok status code", () => {

        expect(response.status).eql(200);
    })

    it("then should return the book", () => {

        expect(createdbook.name).eql(book.name);
        expect(createdbook.author).eql(book.author);

    })
    it("then should return a json as content type", () => {
        expect(response.headers['content-type']).to.contain('application/json');

    })


    after(() => {
        axios.delete('https://books-icesi-munoz-back.herokuapp.com/books/' + createdbook.id);

    })








    describe("When the user wants to create a book whith object by author", () => {

        before(async () => {

            try {
                response = await axios.post('https://books-icesi-munoz-back.herokuapp.com/books', badBook);
            } catch (error) {
                response = 400;
            }


        });

        it("then it should return an exception is not captured", () => {

            expect(response).eql(400);

        })

    });
});




