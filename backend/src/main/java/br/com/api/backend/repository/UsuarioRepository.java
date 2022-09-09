package br.com.api.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.api.backend.model.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

	List<Usuario> findByNome(String nome);

	Usuario findByRg(String identificador);

	Usuario findByCpf(String identificador);

	Integer deleteByCpf(String identificador);

	Integer deleteByRg(String identificador);
}
