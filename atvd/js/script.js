let linhaEditando = null; // Variável para rastrear a linha sendo editada

function adicionarCliente(event) {
    // Previne o comportamento padrão do formulário
    event.preventDefault();

    // Obtém os valores dos campos
    const nome = document.getElementById("nome").value.trim();
    const sobrenome = document.getElementById("sobrenome").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefone = document.getElementById("telefone").value.trim();

    // Verifica se os campos estão preenchidos
    if (!nome || !sobrenome || !telefone) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    if (linhaEditando) {
        // Atualiza a linha existente
        linhaEditando.cells[0].textContent = nome;
        linhaEditando.cells[1].textContent = sobrenome;
        linhaEditando.cells[2].textContent = email;
        linhaEditando.cells[3].textContent = telefone;

        // Restaura o botão "Editar"
        const botaoConfirmar = linhaEditando.cells[4].querySelector(".confirmar");
        botaoConfirmar.textContent = "Editar";
        botaoConfirmar.style.backgroundColor = "#ffc107";
        botaoConfirmar.classList.remove("confirmar");
        botaoConfirmar.classList.add("editar");

        // Limpa a variável de edição
        linhaEditando = null;

        // Reativa o botão "Adicionar"
        document.querySelector("button[type='submit']").disabled = false;

        // Limpa os campos do formulário
        document.getElementById("nome").value = "";
        document.getElementById("sobrenome").value = "";
        document.getElementById("email").value = "";
        document.getElementById("telefone").value = "";

        return;
    }

    // Adiciona uma nova linha na tabela
    const tabela = document.getElementById("listaClientes");
    const novaLinha = tabela.insertRow();

    const celulaNome = novaLinha.insertCell(0);
    const celulaSobrenome = novaLinha.insertCell(1);
    const celulaEmail = novaLinha.insertCell(2);
    const celulaTelefone = novaLinha.insertCell(3);
    const celulaAcoes = novaLinha.insertCell(4);

    celulaNome.textContent = nome;
    celulaSobrenome.textContent = sobrenome;
    celulaEmail.textContent = email;
    celulaTelefone.textContent = telefone;

    // Botão de editar
    const botaoEditar = document.createElement("button");
    botaoEditar.textContent = "Editar";
    botaoEditar.style.backgroundColor = "#ffc107";
    botaoEditar.style.color = "white";
    botaoEditar.style.border = "none";
    botaoEditar.style.padding = "5px 10px";
    botaoEditar.style.borderRadius = "4px";
    botaoEditar.style.cursor = "pointer";
    botaoEditar.style.marginRight = "5px";
    botaoEditar.classList.add("editar");

    botaoEditar.onclick = function () {
        if (linhaEditando) {
            alert("Você já está editando outra linha.");
            return;
        }

        // Preenche os campos do formulário com os valores da linha
        document.getElementById("nome").value = celulaNome.textContent;
        document.getElementById("sobrenome").value = celulaSobrenome.textContent;
        document.getElementById("email").value = celulaEmail.textContent;
        document.getElementById("telefone").value = celulaTelefone.textContent;

        // Define a linha atual como sendo editada
        linhaEditando = novaLinha;

        // Altera o botão "Editar" para "Confirmar"
        botaoEditar.style.display = "none"; // Esconde o botão "Editar"

        const botaoConfirmar = document.createElement("button");
        botaoConfirmar.textContent = "Confirmar";
        botaoConfirmar.style.backgroundColor = "#28a745";
        botaoConfirmar.style.color = "white";
        botaoConfirmar.style.border = "none";
        botaoConfirmar.style.padding = "5px 10px";
        botaoConfirmar.style.borderRadius = "4px";
        botaoConfirmar.style.cursor = "pointer";
        botaoConfirmar.classList.add("confirmar");

        botaoConfirmar.onclick = function () {
            // Atualiza os valores da linha
            celulaNome.textContent = document.getElementById("nome").value.trim();
            celulaSobrenome.textContent = document.getElementById("sobrenome").value.trim();
            celulaEmail.textContent = document.getElementById("email").value.trim();
            celulaTelefone.textContent = document.getElementById("telefone").value.trim();

            // Restaura o botão "Editar"
            botaoEditar.style.display = "inline-block";
            celulaAcoes.removeChild(botaoConfirmar);

            // Limpa a variável de edição
            linhaEditando = null;

            // Reativa o botão "Adicionar"
            document.querySelector("button[type='submit']").disabled = false;

            // Limpa os campos do formulário
            document.getElementById("nome").value = "";
            document.getElementById("sobrenome").value = "";
            document.getElementById("email").value = "";
            document.getElementById("telefone").value = "";
        };

        celulaAcoes.appendChild(botaoConfirmar);

        // Desativa o botão "Adicionar"
        document.querySelector("button[type='submit']").disabled = true;
    };

    // Botão de remover
    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "Remover";
    botaoRemover.style.backgroundColor = "#dc3545";
    botaoRemover.style.color = "white";
    botaoRemover.style.border = "none";
    botaoRemover.style.padding = "5px 10px";
    botaoRemover.style.borderRadius = "4px";
    botaoRemover.style.cursor = "pointer";

    botaoRemover.onclick = function () {
        // Exibe a mensagem de confirmação
        const confirmar = confirm("Tem certeza de que deseja remover este item?");
        if (confirmar) {
            tabela.deleteRow(novaLinha.rowIndex - 1);
            if (linhaEditando === novaLinha) {
                linhaEditando = null; // Limpa a variável se a linha editada for removida
                document.querySelector("button[type='submit']").disabled = false; // Reativa o botão "Adicionar"
            }
        }
    };

    celulaAcoes.appendChild(botaoEditar);
    celulaAcoes.appendChild(botaoRemover);

    // Limpa os campos do formulário
    document.getElementById("nome").value = "";
    document.getElementById("sobrenome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("telefone").value = "";
}