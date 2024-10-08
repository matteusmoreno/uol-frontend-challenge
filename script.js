// Função para listar jogadores (fora do DOMContentLoaded)
function listPlayers() {
    fetch("https://uol-backend-challenge-fudzgsc9hhbjgbaf.eastus2-01.azurewebsites.net/players/find-all")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao buscar jogadores: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const playersTableBody = document.querySelector("#playersTable tbody");
            playersTableBody.innerHTML = "";
            data.content.forEach(player => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${player.name}</td>
                    <td>${player.email}</td>
                    <td>${player.phone}</td>
                    <td>${player.nickname}</td>
                    <td>${player.heroesGroup}</td>
                    <td class="actions">
                        <button onclick="deletePlayer(${player.id})">Excluir</button>
                    </td>
                `;
                playersTableBody.appendChild(row);
            });
        })
        .catch(error => console.error("Erro ao listar jogadores:", error));
}

// Função para deletar um jogador (fora do DOMContentLoaded)
function deletePlayer(playerId) {
    fetch(`https://uol-backend-challenge-fudzgsc9hhbjgbaf.eastus2-01.azurewebsites.net/players/delete/${playerId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert('Jogador deletado com sucesso!');
            listPlayers();  // Atualiza a lista após deletar
        } else {
            alert('Erro ao deletar o jogador.');
        }
    })
    .catch(error => console.error('Erro:', error));
}

document.addEventListener("DOMContentLoaded", function() {
    const playerForm = document.getElementById("playerForm");

    // Função para cadastrar novo jogador
    playerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const playerData = {
            name: playerForm.name.value,
            email: playerForm.email.value,
            phone: playerForm.phone.value,
            heroesGroup: playerForm.heroesGroup.value
        };

        fetch("https://uol-backend-challenge-fudzgsc9hhbjgbaf.eastus2-01.azurewebsites.net/players/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(playerData)
        })
        .then(response => {
            if (response.ok) {
                alert("Jogador cadastrado com sucesso!");
                playerForm.reset();
                listPlayers();
            } else {
                alert("Erro ao cadastrar jogador.");
            }
        })
        .catch(error => console.error("Erro ao cadastrar jogador:", error));
    });

    // Inicializa a lista de jogadores quando o DOM estiver carregado
    listPlayers();
    
});
