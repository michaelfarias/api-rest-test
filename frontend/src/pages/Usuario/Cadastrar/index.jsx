import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { FormControl } from '@mui/material';


import api from '../../../services/api';

const validationSchema = yup.object({
    nome: yup
        .string('Digite seu nome')
        .min(6, 'Nome deve ter pelo menos 6')
        .matches(/^[aA-zZ\s]+$/, 'Somente letras e sem acento')
        .required("O nome é obrigatório"),

    cpf: yup
        .string('Coloque seu cpf')
        .matches(/^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$/, 'cpf inválido')
        .required("O cpf é obrigatório")
        .test('len', 'O cpf deve conter pontos e números', val => val && val.toString().valueOf().length === 14)
        .typeError('Números e pontos'),

    rg: yup
        .string('Digite seu rg')
        .matches(/^[0-9]{1,2}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{1}$/, 'rg inválido')
        .required("Rg obrigatório")
        .test('len', 'O rg deve conter 11 digitos', val => val && val.toString().length <=11)
        .typeError("Somente números"),

    nomeMae: yup
        .string('Digite o nome da sua mãe')
        .required('O nome da mãe é obrigatório'),

    dataNascimento: yup.date()

});


const Formulario = (props) => {

    function handleSubmit(values) {
        console.log("enviando...", values)

        const result = api.post('/', values).then(res => {

            console.log(res)

            if (res.status === 201) {
                // toast.success('Cadastrado com sucesso!', { autoClose: 3000 });

                // window.setTimeout(() => {
                //     history.push('/login')
                // }, 3000);

                // return true;
            }

        }).catch(err => {

        });


    }

    const formik = useFormik({
        initialValues: {
            nome: "",
            cpf: "",
            rg: "",
            nomeMae: "",
            dataNascimento: new Date().toLocaleDateString()
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // values.dataNascimento = new Date(values.dataNascimento).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
            handleSubmit(values)
        },
    })

    return (
        <div className="container-form">
            <form onSubmit={formik.handleSubmit}>
                <FormControl>

                    <TextField

                        id="nome"
                        name="nome"
                        label="Nome"
                        type="text"

                        variant="outlined"
                        margin="normal"
                        fullWidth

                        value={formik.values.nome}
                        onChange={formik.handleChange}
                        error={formik.touched.nome && Boolean(formik.errors.nome)}
                        helperText={formik.touched.nome && formik.errors.nome}

                    />

                    <TextField

                        id="cpf"
                        name="cpf"
                        label="Cpf"
                        type="text"

                        variant="outlined"
                        margin="normal"
                        fullWidth

                        value={formik.values.cpf}
                        onChange={formik.handleChange}
                        error={formik.touched.cpf && Boolean(formik.errors.cpf)}
                        helperText={formik.touched.cpf && formik.errors.cpf}

                    />


                    <TextField

                        id="rg"
                        name="rg"
                        label="RG"
                        type="text"

                        variant="outlined"
                        margin="normal"
                        fullWidth

                        value={formik.values.rg}
                        onChange={formik.handleChange}
                        error={formik.touched.rg && Boolean(formik.errors.rg)}
                        helperText={formik.touched.rg && formik.errors.rg}

                    />
                    <br />
                    <TextField

                        id="nomeMae"
                        name="nomeMae"
                        label="Nome da Mãe"
                        type="text"

                        variant="outlined"
                        margin="normal"
                        fullWidth

                        value={formik.values.nomeMae}
                        onChange={formik.handleChange}
                        error={formik.touched.nomeMae && Boolean(formik.errors.nomeMae)}
                        helperText={formik.touched.nomeMae && formik.errors.nomeMae}

                    />
                    <br />

                    Data de Nascimento
                    <input
                        name="dataNascimento"
                        label="Data de nascimento"
                        type='date'
                        value={formik.values.dataNascimento}
                        onChange={formik.handleChange}
                    />
                    <br />

                    <Button type='submit' variant='contained'>Cadastrar</Button>

                </FormControl>

            </form>
        </div>
    )
}

export default Formulario;