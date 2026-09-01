package school.sptech.projeto_individual;

import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.web.bind.annotation.*;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/produto")
public class ProdutoController {


    private final JdbcTemplate jdbcTemplate;

    public ProdutoController(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate =jdbcTemplate;
    }

    @GetMapping
    public ResponseEntity<List<Produto>> listarJogos(){
        String sql = "SELECT * FROM produto";
        List<Produto> jogos = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Produto.class));
        return ResponseEntity.status(200).body(jogos);
    }


    @PostMapping
    public ResponseEntity<Produto> cadastrar(@RequestBody Produto novoProduto){

        String sql = "INSERT INTO produto (nome,descricao,preco,quantidade,tipo) VALUES (?,?,?,?,?);";


        if(!verificarCampos(novoProduto.getNome(), novoProduto.getDescricao(), novoProduto.getPreco(),
                novoProduto.getQuantidade(), novoProduto.getTipo() )){
            return  ResponseEntity.status(400).build();
        }

        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

            ps.setString(1,novoProduto.getNome());
            ps.setString(2,novoProduto.getDescricao());
            ps.setInt(3,novoProduto.getPreco());
            ps.setInt(4,novoProduto.getQuantidade());
            ps.setString(5,novoProduto.getTipo());

            return  ps;

        },keyHolder);

        Integer idInserido =  keyHolder.getKeyAs(Integer.class);
        novoProduto.setId(idInserido);
        return  ResponseEntity.status(201).build();

    }





    // metodos auxiliares

    public Boolean verificarCampos(String nome, String descricao, Integer preco, Integer quantidade,String tipo){


        return nome != null && !nome.isBlank() &&
                descricao != null && !descricao.isBlank() &&
                preco != null && preco > 0 &&
                quantidade != null && quantidade >= 0 &&
                tipo != null;
    }
}
