/// <reference types="cypress" />
import data from '../../fixtures/data.json';

class petService {
    
    baseUrl = data["BASE_URL"];
    headers = data["HEADERS"];

    postImage(petKey,expectedStatus){
        const petData = data[petKey]; 
        const petId = petData.id.toString()
        const petImgUrl = petData.photoUrls[0].toString()
        cy.fixture(petImgUrl, 'binary').then(fileContent => {
            const formData = new FormData();
            formData.append('file', new Blob([fileContent]), petImgUrl);
            cy.request({
                method: 'POST',
                url: this.baseUrl + '/pet/'+ petId+'/uploadImage',
                body: formData,
                headers: {
                'Content-Type': 'multipart/form-data'
                },
                failOnStatusCode: false,
            }).then(res=> {
                expect(res.status).to.eq(expectedStatus);
            });
            
        });
    }

    postPet(petKey, expectedStatus) {
        const petData = data[petKey]; 
        cy.request({
            method: 'POST',
            url: `${this.baseUrl}/pet`,
            headers: this.headers,
            body: petData,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.equal(expectedStatus);
            if (expectedStatus < 300){
                expect(res.body).to.deep.equal(petData);
            }
        });
    }

    putPet(petKey, expectedStatus) {
        const petData = data[petKey]; 
        cy.request({
            method: 'PUT',
            url: `${this.baseUrl}/pet`,
            headers: this.headers,
            body: petData,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.equal(expectedStatus);
            if (expectedStatus < 300){
                expect(res.body).to.deep.equal(petData);
            }
        });
    }

    getPetByStatus(petStatus, expectedStatus) {
        cy.request({
            method: 'GET',
            url: `${this.baseUrl}/pet/findByStatus?status=${petStatus}`,
            headers: this.headers,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.equal(expectedStatus);
            if (expectedStatus < 300){
                cy.wrap(res.body).each((pet) =>{
                    expect(pet).to.have.property('status').to.equal(petStatus);
                })
            }
            
        });
    }

    getPetById(dataKey, expectedStatus) {
        const petData = data[dataKey]; 
        const petId = petData.id.toString();
        cy.request({
            method: 'GET',
            url: `${this.baseUrl}/pet/${petId}`,
            headers: this.headers,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.equal(expectedStatus);
            if (expectedStatus < 300){
                expect(res.body).to.deep.equal(petData);
            }
            
        });
    }

    updatePetData(requestKey, expectedStatus) {
        const requestData = data[requestKey]; 
        cy.request({
            method: 'POST',
            url: `${this.baseUrl}/pet/${requestData.id}`,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: {
                "name":requestData.name,
                "status": requestData.status
            },
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.equal(expectedStatus);
            if (expectedStatus < 300){
                expect(res.body).to.have.property('message').to.equal(requestData.id.toString());
            }
        });
    }

    deletePet(requestKey, expectedStatus) {
        const requestData = data[requestKey]; 
        cy.request({
            method: 'DELETE',
            url: `${this.baseUrl}/pet/${requestData.id}`,
            headers: this.headers,
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.equal(expectedStatus);
            if (expectedStatus < 300){
                expect(res.body).to.have.property('message').to.equal(requestData.id.toString());
            }
            
        });
    }

}

module.exports = new petService();
