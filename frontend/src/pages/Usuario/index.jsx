import React from "react";
import { useLocation, Link } from "react-router-dom";

const columns =
{
    "id": "ID",

    'nome': 'Nome',

    'cpf': 'Cpf',

    'rg': 'Rg',

    'nomeMae': 'Nome da mãe',

    'dataNascimento': 'Data de Nascimento',

    'dataCadastro': 'Data de Cadastro'
};

const DadosDoUsuario = () => {
    const location = useLocation();
    const dados = location.state.dados
    let keys = []

    for (var [key, value] of Object.entries(dados)) {
        keys.push(key)
    }

    return (
        <div>

            <h1>
                Dados do Usuário
            </h1>

            {
                keys.map(key =>
                    <div key={key}>
                        <strong>
                            {columns[key]}
                        </strong>
                        :&ensp;
                        {dados[key]}
                        <br /> <br />
                    </div>
                )
            }

            <Link to='/usuarios'>
                <button>
                    Voltar
                </button>
            </Link>
        </div >
    )

}

export default DadosDoUsuario