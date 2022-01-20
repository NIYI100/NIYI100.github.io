let karten: string [] = [("./Karten/Karte_0_blau.png"), ("./Karten/Karte_0_gelb.png"), ("./Karten/Karte_0_grün.png"), ("./Karten/Karte_0_rot.png"),
("./Karten/Karte_1_blau.png"), ("./Karten/Karte_1_gelb.png"), ("./Karten/Karte_1_grün.png"), ("./Karten/Karte_1_rot.png"),
("./Karten/Karte_2_blau.png"), ("./Karten/Karte_2_grün.png"), ("./Karten/Karte_2_gelb.png"), ("./Karten/Karte_2_rot.png"),
("./Karten/Karte_3_blau.png"), ("./Karten/Karte_3_grün.png"), ("./Karten/Karte_3_gelb.png"), ("./Karten/Karte_3_rot.png"),
("./Karten/Karte_4_blau.png"), ("./Karten/Karte_4_grün.png"), ("./Karten/Karte_4_gelb.png"), ("./Karten/Karte_4_rot.png"),
("./Karten/Karte_5_blau.png"), ("./Karten/Karte_5_grün.png"), ("./Karten/Karte_5_gelb.png"), ("./Karten/Karte_5_rot.png"),
("./Karten/Karte_6_blau.png"), ("./Karten/Karte_6_grün.png"), ("./Karten/Karte_6_gelb.png"), ("./Karten/Karte_6_rot.png"),
("./Karten/Karte_7_blau.png"), ("./Karten/Karte_7_grün.png"), ("./Karten/Karte_7_gelb.png"), ("./Karten/Karte_7_rot.png")]; 


function karteziehen (): void {
    let neuekarte: string = karten.pop();
    console.log(neuekarte);
}