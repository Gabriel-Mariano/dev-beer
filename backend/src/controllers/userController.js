const conn = require("../database/connection");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
var salt = bcrypt.genSaltSync();

module.exports = {
    async create(req,res){
        const user = {
            username:req.body.username,
            email:req.body.email,
            password:String(req.body.password)
        }

        

        conn.query("SELECT * FROM usuarios WHERE email=?",[user.email],(err,results)=>{
            if(err){
                return res.status(500).json({
                   message:err.message,
                   code:err.code
                });
            }
            if(results.length > 0){
                return res.status(409).json({
                    message:'Email já cadastrado',
                    code:409
                });
            }

            bcrypt.hash(user.password, salt, (errBycript,hash)=>{
                if(errBycript){
                    return res.status(500).json({ 
                        message:errBycript.message
                    });
                }

                const sql = `INSERT INTO usuarios (nome, email, senha) VALUES(?,?,?)`;

                conn.query(sql,[user.username, user.email, hash],(err,results)=>{
                    if(err){
                        return res.status(500).json({
                            message:err.message,
                            code:err.code
                        });
                    } 
                    res.status(201).json({
                        message:'Conta criada com sucesso!'
                        });
                    });
                });
            });

    },

    async login(req,res){
        const user = {
            email:req.body.email,
            password:req.body.password
        }

        const sql = "SELECT * FROM usuarios WHERE email=?";

         conn.query(sql,[user.email],(err,results)=>{
            if(err){
                return res.status(500).json({
                   message:err.message,
                   code:err.code
                });
            }
            if(results.length < 1){
                return res.status(401).send({
                    message:'Falha na autenticação',
                    code:409
                });
            }

            bcrypt.compare(user.password,results[0].senha,(err,result)=>{
                if(err){
                    return res.status(401).send({ message: err});
                }
                if(result){
                    const token = jwt.sign({
                        id:results[0].id,
                        name:results[0].nome
                    },'segredo', { expiresIn:60*60 });
                    res.status(200).json({
                        user:results[0].nome,
                        email: results[0].email,
                        foto: results[0].foto,
                        descricao: results[0].descricao,
                        nascimento: results[0].nascimento,
                        bairro: results[0].bairro,
                        cidade: results[0].cidade,
                        uf: results[0].uf,
                        token:token
                    });
                }else{
                    res.status(401).send({ message: 'Falha na autenticação '});
                }
                
            });
        });
    }
        
}