var EIA;
(function (EIA) {
    window.addEventListener("load", function () {
        /*Array, in dem alle mit InDesign erstellte Karten enthalten sind*/
        let karten = [("./Karten/Karte_0_blau.png"), ("./Karten/Karte_0_gelb.png"), ("./Karten/Karte_0_grün.png"), ("./Karten/Karte_0_rot.png"),
            ("./Karten/Karte_1_blau.png"), ("./Karten/Karte_1_gelb.png"), ("./Karten/Karte_1_grün.png"), ("./Karten/Karte_1_rot.png"),
            ("./Karten/Karte_2_blau.png"), ("./Karten/Karte_2_grün.png"), ("./Karten/Karte_2_gelb.png"), ("./Karten/Karte_2_rot.png"),
            ("./Karten/Karte_3_blau.png"), ("./Karten/Karte_3_grün.png"), ("./Karten/Karte_3_gelb.png"), ("./Karten/Karte_3_rot.png"),
            ("./Karten/Karte_4_blau.png"), ("./Karten/Karte_4_grün.png"), ("./Karten/Karte_4_gelb.png"), ("./Karten/Karte_4_rot.png"),
            ("./Karten/Karte_5_blau.png"), ("./Karten/Karte_5_grün.png"), ("./Karten/Karte_5_gelb.png"), ("./Karten/Karte_5_rot.png"),
            ("./Karten/Karte_6_blau.png"), ("./Karten/Karte_6_grün.png"), ("./Karten/Karte_6_gelb.png"), ("./Karten/Karte_6_rot.png"),
            ("./Karten/Karte_7_blau.png"), ("./Karten/Karte_7_grün.png"), ("./Karten/Karte_7_gelb.png"), ("./Karten/Karte_7_rot.png")];
        let kartengesamt = [karten[0], karten[1], karten[2], karten[3], karten[4], karten[5], karten[6]];
        var index = 0;
        let kartenstapelrot = document.querySelector(".rotekarten");
        let kartenstapelgrün = document.querySelector(".gruenekarten");
        let kartenstapelblau = document.querySelector(".blauekarten");
        let kartenstapelgelb = document.querySelector(".gelbekarten");
        /**function karteziehen (): void {
            let neuekarte: string = karten.pop();
            console.log(neuekarte);
        }
        */
        function kartenmischen() {
            for (var i = karten.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1)); //random index
                [karten[i], karten[j]] = [karten[j], karten[i]]; // swap
            }
        }
        document.querySelector(".Stapelzumziehen").addEventListener("click", karteziehen);
        /*
        let redcards: HTMLInputElement = document.querySelector(".rotekarten");
        let greencards: HTMLInputElement = document.querySelector(".grünekarten");
        let yellowcards: HTMLInputElement = document.querySelector(".gelbekarten");
        let bluecards: HTMLInputElement = document.querySelector(".blauekarten");
        */
        /*interface karten {
            karte: string;
            farbe: string;
            zahl: number;
        }
        
        let kartenstapel: [karten] = [];
        
        function kartegenerierenfürstapel (): void {
            kartenstapel.push({
                karte:
                farbe: "red, green, blue, yellow;"
                zahl: "0, 1, 2, 3, 4, 5, 6, 7;"
            });
        }*/
        /*
        class Card {
            construction (suit, value){
            this.suit = suit
            this.value = value
            }
        
            get color {
        
                }
        
        function kartegenerieren: void {
            const cardDiv = document.createElement("div");
            cardDiv.innerText = this.suit;
            cardDiv.classList.add ("card", this.color);
        }
        });
        */
    });
})(EIA || (EIA = {}));
//# sourceMappingURL=Endaufgabe.js.map