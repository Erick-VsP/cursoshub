const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

const should = chai.should();

chai.use(chaiHttp);

describe('Instituicoes', () => {
    it('deve listar todas as instituições', (done) => {
        chai.request(server)
            .get('/instituicao')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });

    it('deve criar uma nova instituição', (done) => {
        chai.request(server)
            .post('/instituicao')
            .set('x-access-token', 'seu_token')
            .send({
                nome_inst: 'Instituição teste',
                cnpj_inst: '1234567890',
                responsavel_inst: 'Responsável teste',
                telefone_inst: '1199999999',
                id_funcionario: 1
            })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
});