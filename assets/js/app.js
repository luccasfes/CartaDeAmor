// Espera o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', (event) => {
    const btn = document.querySelector(".no");
    let position = 0;
    let isAnimating = false;

    btn.addEventListener("click", function() {
        if (!isAnimating) {
            isAnimating = true;
            position = position === 0 ? 150 : 0;
            btn.style.transform = `translate(0px, ${position}px)`;
            btn.style.transition = "all 0.2s ease";

            setTimeout(function() {
                isAnimating = false;
            }, 200);

            // Adiciona o alerta de confirmação ao clicar no botão "Não"
            Swal.fire({
                title: 'Ei, o que você está fazendo?',
                text: 'Tentando apertar no "Não", em? Não pode!',
                icon: 'warning',
                confirmButtonText: 'Desculpa! 😅'
            });
        }
    });

    btn.addEventListener("mouseover", function() {
        if (!isAnimating) {
            isAnimating = true;
            position = position === 0 ? 150 : 0;
            btn.style.transform = `translate(0px, ${position}px)`;
            btn.style.transition = "all 0.2s ease";

            setTimeout(function() {
                isAnimating = false;
            }, 200);
        }
    });

    const sim = document.getElementById('yes');

    sim.addEventListener("click", () => {
        let currentIndex = 0;
        const cartas = [
            'Carta 1: Ah, meu amor, é tão difícil colocar em palavras tudo o que sinto por você. Esta carta é apenas uma pequena tentativa de expressar o quanto você significa para mim, cheia de amor e um pouco de dificuldade para encontrar as palavras certas. Cada sorriso seu ilumina meu dia de uma forma única. O cantor Roberto Carlos já expressou algo que por você eu sinto com tanta intensidade: "Eu quero olhar nos seus olhos sem duvidar do que faço, quero beijar sua boca e te prender nos meus braços." Isso já acontece, e mesmo que não seja todos os dias que eu possa olhar os seus olhos, estou ansioso pra que isso seja uma constante, meu amor.💖',
            'Carta 2: Bom, meu amor, quero agradecer, nesta segunda carta, por todos os sorrisos, momentos especiais e carinho que você me dá. Que tenhamos muito mais. Preciso ressaltar que, às vezes, você é um pouco chatinha, mas é a minha favorita. Em uma poesia, eu já comentei: "Se os deuses nos vissem, ficariam perplexos, pois nós dois formamos o casal do século." Amor, aquele seu abraço é o que me salva quando as coisas ficam difíceis. Seu olhar castanho traz a alegria que preciso, e sua boca deliciosa é algo que adoro apreciar. Seu cabelo e suas formas me fazem admirar o quão lindo você é. Essas pequenas coisas que fazem você ser quem é são o que me fazem apaixonar por você. Seu jeito de me fazer sorrir e suas manias que já aprendi a amar são apenas alguns dos motivos pelos quais estou sempre ansioso para aprender algo novo com você.🥰',
            'Carta 3: Chegamos à terceira carta. Bom, eu poderia falar dia e noite, até por meses e anos, mas nenhuma palavra, refrão, poesia ou canção seria o suficiente para expressar o quanto eu me apaixono por você todos os dias e o quanto te amo cada vez mais. Então, nesta carta, só quero dizer: feliz aniversário, meu amor! Sou feliz por ter você como namorada, e como já disse, você traz a melhor versão de mim.🥰'
        ];

        function mostrarCarta(index) {
            Swal.fire({
                title: `Carta ${index + 1}`,
                text: cartas[index],
                showCancelButton: index > 0,
                confirmButtonText: 'Avançar',
                cancelButtonText: 'Voltar',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    // Avançar
                    if (currentIndex < cartas.length - 1) {
                        currentIndex++;
                        mostrarCarta(currentIndex);
                    } else {
                        // Exibir a imagem após a última carta
                        Swal.fire({
                            title: 'Você me trazendo um sorriso sincero. Te amooo❤️.',
                            imageUrl: 'assets/img/casal.jpg',
                            imageAlt: 'Imagem de Teste',
                            confirmButtonText: 'Fechar',
                            customClass: {
                                image: 'custom-swal-image'  
                            }
                        }).then(() => {
                            // Apresenta o vídeo após fechar a imagem
                            let videoIndex = 0; 
                            const videos = [
                                'assets/video/eu a patroaa.mp4', 
                                'assets/video/friends.mp4' 
                            ];

                            function mostrarVideo(index) {
                                const audio = document.getElementById('bg-music');
                                audio.pause(); // Pausa a música
                            
                                Swal.fire({
                                    title: `Cenas especiais que me fazem lembrar de você e que, com certeza, eu acho que irão te fazer sorrir. 🥰`,
                                    html: `<video width="300" height="300" controls autoplay>
                                              <source src="${videos[index]}" type="video/mp4">
                                              Seu navegador não suporta o elemento de vídeo.
                                           </video>`,
                                    showCancelButton: true,
                                    confirmButtonText: 'Avançar',
                                    cancelButtonText: 'Voltar',
                                    reverseButtons: true,
                                    customClass: {
                                        popup: 'custom-swal-popup',
                                        overlay: 'custom-swal-overlay' 
                                    }
                                
                                
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        // Avançar
                                        if (index < videos.length - 1) {
                                            index++;
                                            mostrarVideo(index);
                                        } else {
                                            // Mensagem final após o último vídeo
                                            Swal.fire({
                                                title: 'É isso!',
                                                text: 'Espero que tenha gostado das cartas. Com amor, de Lucas para Sarah.❤️🥰',
                                                icon: 'success',
                                                confirmButtonText: 'OK'
                                            }).then(() => {
                                                audio.play(); // Reinicia a música após o último vídeo
                                            });
                                        }
                                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                                        // Voltar
                                        if (index > 0) {
                                            index--;
                                            mostrarVideo(index);
                                        } else {
                                            audio.play(); // Reinicia a música se voltar ao início
                                        }
                                    }
                                });
                            }
                            
                            // Inicia a exibição do primeiro vídeo
                            mostrarVideo(videoIndex); // Inicia a exibição do primeiro vídeo
                            
                        });
                    }
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    if (currentIndex > 0) {
                        currentIndex--;
                        mostrarCarta(currentIndex);
                    }
                }
            });
        }

        mostrarCarta(currentIndex);
    });
});