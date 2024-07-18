const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    // Obtem os inputs da action
    const token = core.getInput('GITHUB_TOKEN');
    const issueId = core.getInput('issue-id');
    const comment = core.getInput('comment');
    
    // Inicializa o cliente do GitHub
    const octokit = github.getOctokit(token);
    
    // Obtem o contexto do repositório
    const context = github.context;
    const { owner, repo } = context.repo;
    
    // Adiciona um comentário ao issue ou pull request
    const response = await octokit.rest.issues.createComment({
        owner: owner,
        repo: repo,
        issue_number: issueId,
        body: comment,
      });
      
      // Obtenha o ID do comentário criado
      const commentId = response.data.id;
      
      // Define o output com o ID do comentário
      core.setOutput('comment-id', commentId);
      
      console.log('Comentário adicionado com sucesso! ID do comentário:', commentId);
    } catch (error) {
      core.setFailed(`Erro ao adicionar comentário: ${error.message}`);
    }
  }
  
  run();
