const axios = require('axios');
const { expect } = require('chai');

let response;
describe("when the user wants to list books", () => {
    before(async () => {

        response = await axios.get('https://books-icesi-munoz-back.herokuapp.com/books');
    });

    it("then it should return an ok status code", () => {

        expect(response.status).eql(200);
    })

    it("then it should return books with id,name,author", () => {

        expect(response.data.length).to.be.greaterThan(0);
        const books = response.data[0];
        expect(books).to.have.property("id");
        expect(books).to.have.property("name");
        expect(books).to.have.property("author");

    })

    describe("when the user wants to list a book that doesnt exist", () => {
        before(async () => {

            response = await axios.get('https://books-icesi-munoz-back.herokuapp.com/books');
        });

        it("then it book doesnt appear in the list", () => {

            let flag = false;
            let nonexistentbook = "nose que poner";
            for (i = 0; i < response.data.length && !flag; i++) {
                if (response.data[i].name == nonexistentbook) {
                    flag = true;
                }

            }
            expect(flag).eql(false);


        })
    });


});

