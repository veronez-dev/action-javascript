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
  } catch (error) {
    core.setFailed(`Erro ao adicionar comentário: ${error.message}`);
  }
}

run();
