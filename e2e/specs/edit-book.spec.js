const axios = require('axios');
const { expect } = require('chai');

let response;
const book = {
    "name": "Prueba",
    "author": "Autor Prueba"
};
let updateBook = {
    "name": "Prueba editado",
    "author": "Autor Prueba editado"
};
const badBook = {
    "name": "Harry Potter",
    "author": book
};
let createdbook;
let updatedBook;
describe("given a created", () => {
    before(async () => {

        response = await axios.post('https://books-icesi-munoz-back.herokuapp.com/books', book);
        createdbook = response.data;
        
    })

    describe("When the user wants to update a book", () => {

        before(async () => {
            response = await axios.put('https://books-icesi-munoz-back.herokuapp.com/books/'+createdbook.id, updateBook);
            updatedBook = response.data;

            
        });

        it("then it should return an ok status code edit", () => {

           
            expect(response.status).eql(200);
        })
        it("then should return the new book edited", () => {
            expect(updatedBook.name).eql(updateBook.name);
            expect(updatedBook.author).eql(updateBook.author);

        })

        after(async() => {

           
           await axios.delete('https://books-icesi-munoz-back.herokuapp.com/books/' + updatedBook.id);

        })








        describe("When the user wants to edit a book with object by author", () => {

            before(async () => {

                try {
                    response = await axios.put('https://books-icesi-munoz-back.herokuapp.com/books/'+createdbook.id, badBook);
                } catch (error) {
                    response = 400;
                }


            });

            it("then it should return an exception is not captured", () => {

                expect(response).eql(400);

            })

        });
    });
});