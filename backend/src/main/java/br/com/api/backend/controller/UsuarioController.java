package br.com.api.backend.controller;

import java.net.URI;
import java.time.LocalDate;
import java.util.List;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import br.com.api.backend.model.Usuario;
import br.com.api.backend.repository.UsuarioRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = "api")
public class UsuarioController {

	@Autowired
	private UsuarioRepository repo;

	@GetMapping("usuarios/todos")
	public List<Usuario> listarTodosUsuarios() {

		return repo.findAll();
	}

	@GetMapping("/usuarios")
	public List<Usuario> listarUsuariosPorNome(@RequestParam String nome) {
		List<Usuario> usuarios = repo.findByNome(nome);

		return usuarios;
	}

	@GetMapping("/usuario")
	public ResponseEntity<Usuario> listarUsuarioPorCpfOuRg(@RequestParam String identificador) {
		Usuario usuario = null;

		if (!identificador.isEmpty()) {

			if (identificador.matches("(^\\d{3}\\.\\d{3}\\.\\d{3}\\-\\d{2}$)"))
				usuario = repo.findByCpf(identificador);
			else if (identificador.matches("(^\\d{1,2}).?(\\d{3}).?(\\d{3})-?(\\d{1}|X|x$)"))
				usuario = repo.findByRg(identificador);
		}

		return usuario != null ? ResponseEntity.ok(usuario) : ResponseEntity.notFound().build();

	}

	@PostMapping
	public ResponseEntity<?> cadastrarUsuario(@Valid @RequestBody Usuario usuario, UriComponentsBuilder uriBuilder) {

		usuario.setDataCadastro(LocalDate.now());
		usuario = repo.save(usuario);

		URI uri = uriBuilder.path("/api").buildAndExpand(usuario.getId()).toUri();

		return ResponseEntity.created(uri).build();
	}

	@Transactional
	@DeleteMapping("usuario")
	public ResponseEntity<?> removerUsuario(@RequestParam String identificador) {
		Integer foiDeletado = 0;
		if (!identificador.isEmpty()) {

			if (identificador.matches("(^\\d{3}\\.\\d{3}\\.\\d{3}\\-\\d{2}$)")) {
				foiDeletado = repo.deleteByCpf(identificador);

			}

			else if (identificador.matches("(^\\d{1,2}).?(\\d{3}).?(\\d{3})-?(\\d{1}|X|x$)")) {
				foiDeletado = repo.deleteByRg(identificador);
			}

		}
		return foiDeletado == 1 ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
	}

}
