const fs = require('fs');
const path = require('path');

// I will read the user's raw prompt from the log file where all this data is stored
// Wait, I can't read the gemini prompt log directly. I need to output it.
// I will just write the JSON strings.

const noSizesRaw = `[
    {
        "id": 1,
        "name": "المشويات",
        "plates": [
            {
                "id": 2,
                "title": "كفتة مشوية شامي",
                "desc": "كفتة مشوية مع شرائح الفلفل والطماطم 1/3 كجم ....1 كجم",
                "imageUrl": "1757113743313-324107.webp",
                "categoryId": 1,
                "status": true,
                "bestSale": false,
            },
            {
                "id": 22,
                "title": " موزة بتلو قطعة ",
                "desc": "موزة بتلو مشوية قطعة",
                "imageUrl": "1757161407025-600052936.webp",
                "categoryId": 1,
                "status": true,
                "bestSale": false,
            }
        ]
    }
]`; // No no no, I can't build it like this, it's too much manual work!
