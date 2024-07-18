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
    
    // Adiciona o comentário ao issue ou pull request
    await octokit.rest.issues.createComment({
      owner: owner,
      repo: repo,
      issue_number: issueId,
      body: comment,
    });
    
    console.log('Comentário adicionado com sucesso!');

    // Obtenha todos os comentários da issue ou pull request
    const { data: comments } = await octokit.rest.issues.listComments({
        issue_number: issueId,
      });
  
      // Concatena todos os comentários em uma única string
      const allComments = comments.map(c => c.body).join('\n---\n');
  
      // Define o output da action
      core.setOutput('all-comments', allComments);
      
      console.log('Todos os comentários foram obtidos com sucesso!');
    } catch (error) {
      core.setFailed(`Erro ao adicionar comentário ou obter comentários: ${error.message}`);
    }
  }

run();
