document.addEventListener('DOMContentLoaded', function() {
    const calculateButton = document.getElementById('calculate-button');
    const speedInput = document.getElementById('speed');
    const resultsSection = document.getElementById('results');
    const downloadTimes = {
        '10mb': document.getElementById('download_10mb'),
        '100mb': document.getElementById('download_100mb'),
        '1gb': document.getElementById('download_1gb'),
        '10gb': document.getElementById('download_10gb')
    };
    const uploadTimes = {
        '10mb': document.getElementById('upload_10mb'),
        '100mb': document.getElementById('upload_100mb'),
        '1gb': document.getElementById('upload_1gb'),
        '10gb': document.getElementById('upload_10gb')
    };
    const speedError = document.getElementById('speed_error');

    function validateSpeed(speed) {
        if (isNaN(speed) || speed <= 0) {
            return false;
        }
        return true;
    }

    function calculateTime(fileSizeMB, speedMbps) {
        if (speedMbps <= 0) {
            return 'N/A';
        }
        const fileSizeBits = fileSizeMB * 8 * 1024 * 1024;
        const speedBitsPerSecond = speedMbps * 1024 * 1024;
        const timeSeconds = fileSizeBits / speedBitsPerSecond;

        if (timeSeconds < 60) {
            return `${timeSeconds.toFixed(2)} segundos`;
        } else if (timeSeconds < 3600) {
            const minutes = Math.floor(timeSeconds / 60);
            const seconds = (timeSeconds % 60).toFixed(2);
            return `${minutes} minutos ${seconds} segundos`;
        } else {
            const hours = Math.floor(timeSeconds / 3600);
            const minutes = Math.floor((timeSeconds % 3600) / 60);
            const seconds = (timeSeconds % 60).toFixed(2);
            return `${hours} horas ${minutes} minutos ${seconds} segundos`;
        }
    }

    calculateButton.addEventListener('click', function() {
        const speed = parseFloat(speedInput.value);
        let hasErrors = false;

        speedError.textContent = '';

        if (!validateSpeed(speed)) {
            speedError.textContent = 'Por favor, ingresa una velocidad válida (mayor que 0).';
            hasErrors = true;
        }

        if (!hasErrors) {
            downloadTimes['10mb'].textContent = calculateTime(10, speed);
            downloadTimes['100mb'].textContent = calculateTime(100, speed);
            downloadTimes['1gb'].textContent = calculateTime(1024, speed);
            downloadTimes['10gb'].textContent = calculateTime(10 * 1024, speed);

            uploadTimes['10mb'].textContent = calculateTime(10, speed);
            uploadTimes['100mb'].textContent = calculateTime(100, speed);
            uploadTimes['1gb'].textContent = calculateTime(1024, speed);
            uploadTimes['10gb'].textContent = calculateTime(10 * 1024, speed);

            resultsSection.style.display = 'block';
        } else {
            resultsSection.style.display = 'none';
        }
    });
});