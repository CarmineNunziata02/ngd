function openLetter() {
    fetch('./assets/lettera/letter.txt')
        .then(response => {
            if (!response.ok) throw new Error('File non trovato');
            return response.text();
        })
        .then(text => {
            const paragraphs = text.split(/\n\s*\n/);
            let htmlContent = '';
            
            paragraphs.forEach(para => {
                if (para.trim() !== '') {
                    const formattedPara = para.replace(/\n/g, '<br>');
                    htmlContent += `<p>${formattedPara}</p>`;
                }
            });

            document.querySelector('.letter-content').innerHTML = htmlContent;
            
            document.body.classList.add('dimmed');
            const overlay = document.getElementById('overlay');
            const letter = document.getElementById('letter');

            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) {
                    closeLetter();
                }
            });
            
            overlay.classList.add('active');
            setTimeout(() => {
                letter.classList.add('active');
            }, 50);
        })
        .catch(error => {
            console.error("Errore:", error);
            alert("Errore nel caricamento della lettera");
        });
}

function closeLetter() {
    document.body.classList.remove('dimmed');
    const overlay = document.getElementById('overlay');
    const letter = document.getElementById('letter');
    
    letter.classList.remove('active');

    overlay.removeEventListener('click', arguments.callee);
    
    letter.classList.remove('active');
    setTimeout(() => {
        overlay.classList.remove('active');
    }, 500);
    
    setTimeout(() => {
        overlay.classList.remove('active');
    }, 500);
}

document.addEventListener('DOMContentLoaded', function() {
    const music = document.getElementById('backgroundMusic');
    
    const playPromise = music.play();
    
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            const playButton = document.createElement('button');
            playButton.innerHTML = '▶ Attiva musica';
            playButton.style.position = 'fixed';
            playButton.style.bottom = '20px';
            playButton.style.right = '20px';
            playButton.style.zIndex = '1000';
            playButton.style.padding = '10px 15px';
            playButton.style.backgroundColor = '#8b5a2b';
            playButton.style.color = 'white';
            playButton.style.border = 'none';
            playButton.style.borderRadius = '5px';
            playButton.style.cursor = 'pointer';
            
            playButton.addEventListener('click', () => {
                music.play();
                playButton.remove();
            });
            
            document.body.appendChild(playButton);
        });
    }
});