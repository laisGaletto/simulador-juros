    function calcularEmprestimo() {
        // Obter valores dos inputs
        const montante = parseFloat(document.getElementById('montante').value);
        const prazo = parseInt(document.getElementById('prazo').value);

        // Validar entrada
        if (isNaN(montante) || isNaN(prazo) || prazo <= 0) {
            showError("Por favor, insira valores válidos.");
            return;
        }

        // Taxa de juros anual base
        let juros = 0.0;

        // Definir a taxa de juros com base no prazo
        if (prazo <= 6) {
            juros = 0.0; // Sem juros para até 6 meses
        } else if (prazo <= 12) {
            juros = 0.15; // Juros de 15% ao ano para 7 a 12 meses
        } else if (prazo <= 22 ) {
            juros = 0.20; // Juros de 20% ao ano para 13 a 20 meses
        } else if (prazo <= 32) {
            juros = 0.30; // Juros de 30% ao ano para 21 a 32 meses
        } else {
            showError("Prazo de parcelamento inválido. Permitido até 32 meses.");
            return;
        }

        // Calcular pagamento mensal usando um loop for
        const pagamento = [];
        let totalPagar = 0;
        for (let i = 0; i < prazo; i++) {
            const meses = (montante * juros);
            totalPagar += meses;
            pagamento.push(meses.toFixed(2));
        }

        // Exibir resultado
        showResult(totalPagar.toFixed(2), pagamento);
    }

    function showResult(totalPagar, pagamento) {
        const resultDiv = document.querySelector('.resultado');
        resultDiv.innerHTML = `<p>Total a ser pago: R$ ${totalPagar}</p>`;
        
        // Exibir parcelas específicas (6, 12 e 32 meses)
        if (pagamento.length >= 6) {
            resultDiv.innerHTML += `<p>Total a ser pago em 6 meses: R$ ${pagamento[5]}</p>`;
        }
        if (pagamento.length >= 12) {
            resultDiv.innerHTML += `<p>Total a ser pago em 12 meses: R$ ${pagamento[11]}</p>`;
        }
        if (pagamento.length >= 32) {
            resultDiv.innerHTML += `<p>Total a ser pago em 32 meses: R$ ${pagamento[31]}</p>`;
        }
    }

    function showError(message) {
        const alertErro = document.getElementById('alertErro');
        alertErro.textContent = message;
        alertErro.classList.add('animate__fadeIn', 'animate__animated');

        // Remover mensagem de erro após 3 segundos
        setTimeout(() => {
            alertErro.textContent = '';
            alertErro.classList.remove('animate__fadeIn', 'animate__animated');
        }, 3000);
    }