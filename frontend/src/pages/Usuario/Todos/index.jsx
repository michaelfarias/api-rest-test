import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';


import FormControl from '@mui/material/FormControl';

import api from '../../../services/api';

const columns = [
  { id: 'nome', label: 'Nome', minWidth: 170 },
  // {
  //   id: 'cpf',
  //   label: 'Cpf',
  //   minWidth: 170,
  //   align: 'right',
  // },
  // {
  //   id: 'rg',
  //   label: 'Rg',
  //   minWidth: 170,
  //   align: 'right',
  // },
  // {
  //   id: 'nomeMae',
  //   label: 'Nome da mãe',
  //   minWidth: 170,
  //   align: 'right',
  // },

  // { id: 'dataNascimento', label: 'Data de Nascimento', minWidth: 100 },

  // { id: 'dataCadastro', label: 'Data de Cadastro', minWidth: 100 },

  { id: 'acao', label: 'Ação', minWidth: 100 }
];


export default function StickyHeadTable() {

  const [dados, setDados] = React.useState([]);
  const [rows, setRows] = React.useState(0);
  const [nome, setNome] = React.useState('')

  React.useEffect(() => {

    api.get('/usuarios/todos').then(res => {

      setDados(res.data)
      setRows(res.data.length)

      if (res.status === 201) {
        // toast.success('Cadastrado com sucesso!', { autoClose: 3000 });

        // window.setTimeout(() => {
        //     history.push('/')
        // }, 3000);

        // return true;
      }

    }).catch(err => {

    });
  }, [])


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  async function removeUser(cpf) {
    const novosDados = dados.filter(dado => (dado.cpf) !== cpf);

    const result = await api.delete('usuario', { params: { identificador: cpf } }).then(res => {

      return res.status;

    });

    if (result === 200) {
      setDados(novosDados)
    }
  }


  async function searchUsers(nome) {
    await api.get('usuarios', { params: { nome: nome } }).then(res => {

      setDados(res.data)

    });

  }


  return (
    <div>
      <FormControl>
        <TextField
          id="outlined-basic"
          label="Insira o nome do usuário"
          variant="outlined"
          value={nome}
          onChange={(event) => { setNome(event.target.value) }}
        />

        <Button variant="contained" onClick={() => { searchUsers(nome) }}>Buscar</Button>
      </FormControl>
      <br /><br />

      <h1>Tabela de Usuários</h1>
      <br /><br />

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>

              {dados
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((dado) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={dado.id}>
                      {columns.map((column) => {
                        const value = dado[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>

                            {column.format !== undefined
                              ? column.format(value)
                              : value
                            }

                            {
                              column.id === 'acao' && (
                                <div>

                                  <button>
                                    <Link to='/usuario'
                                      state={{
                                        dados: dado

                                      }}>
                                      Ver dados
                                    </Link>
                                    &ensp;
                                  </button>

                                  <button onClick={() => { removeUser(dado.cpf) }}>
                                    Remover
                                  </button>
                                </div>
                              )
                            }

                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>

          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 20, 50]}
          component="div"
          count={rows}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
