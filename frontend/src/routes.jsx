import React from 'react';
import { BrowserRouter, Route, Routes as Switch } from 'react-router-dom';

import CadastarUsuario from './pages/Usuario/Cadastrar';
import TabelaUsuarios from './pages/Usuario/Todos';
import DadosDoUsuario from './pages/Usuario'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' />
                <Route path='/cadastro' element={<CadastarUsuario />} />
                <Route path='/usuarios' element={<TabelaUsuarios />} />
                <Route path='/usuario' element={<DadosDoUsuario />} />
            </Switch>
        </BrowserRouter>
    );
}