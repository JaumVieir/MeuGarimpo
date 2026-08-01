import express from 'express';
import { pool } from '../db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();

router.get('/', async(req,res) => {
    try{
        const resultado =  await pool.query(`SELECT * FROM USUARIOS `);
        res.json(resultado.rows);

    }catch(err){
        console.error(err);
        res.status(500).json({error: 'Erro ao buscar USUARIOS'});
    }
});

router.post('/', async(req,res) =>{
    try{
        const {nome, telefone,email, senha, plano, status} =  req.body;

        if(!nome || !telefone || !email || !senha || !plano || !status){
            return res.status(400).json({error: 'Preencha todos os campos necessários!'});
        }

        if(senha.length < 8){
            return res.status(400).json({error: 'Senha precisa ter no mínimo 8 caracteres!'});
        }

        const validaEmail = await pool.query('SELECT * FROM USUARIOS WHERE email = $1', [email]);
        if(validaEmail.rows.length > 0 ){
            return res.status(401).json({error:'E-mail já cadastrado!'});
        }

        const validaTelefone = await pool.query('SELECT * FROM USUARIOS WHERE telefone = $1',[telefone]);
        if(validaTelefone.rows.length > 0){
            return res.status(401).json({error:'Telefone já cadastrado!'});
        }

        const senhaHash = await bcrypt.hash(senha, 16);

        const resultado = await pool.query(
            'INSERT INTO USUARIOS (nome,telefone,email, senha_hash,plano,status) VALUES ($1,$2,$3,$4,$5,$6)' +
            'RETURNING id,nome,email',[nome,telefone,email,senhaHash,plano,status]
        );

        res.status(201).json(resultado.rows[0]);
    }catch(err){
        res.status(500).json({error:`${err}`});
    }
})



export default router;