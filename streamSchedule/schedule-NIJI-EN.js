var oldschedule = [
[`Elira Pendora`, new Date(`Sun Mar 06 2022 21:00:00 GMT-0500 (Eastern Standard Time)`), `Don't Starve Together`, `Lazusydia Collab`],
[`Elira Pendora`, new Date(`Tue Mar 08 2022 19:00:00 GMT-0500 (Eastern Standard Time)`), `Worms Armageddon`, `Niji EN Collab`],
[`Elira Pendora`, new Date(`Wed Mar 09 2022 16:00:00 GMT-0500 (Eastern Standard Time)`), `Xenoblade Chronicles`, `Future Connected`],
[`Elira Pendora`, new Date(`Wed Mar 09 2022 22:00:00 GMT-0500 (Eastern Standard Time)`), `Twisted Wonderland`, `w/ Petra`],
[`Elira Pendora`, new Date(`Thu Mar 10 2022 19:00:00 GMT-0500 (Eastern Standard Time)`), `Dark Souls 3`, `Worm Revenge`],
[`Elira Pendora`, new Date(`Fri Mar 11 2022 15:00:00 GMT-0500 (Eastern Standard Time)`), `AI Somnium Files`, `Part 2`],
[`Elira Pendora`, new Date(`Sat Mar 12 2022 12:30:00 GMT-0500 (Eastern Standard Time)`), `Lucky Dragon Host Club`, ``],
[`Elira Pendora`, new Date(`Sat Mar 12 2022 19:00:00 GMT-0500 (Eastern Standard Time)`), `Members HXH2011 watchalong`, ``],
[`Finana Ryugu`, new Date(`Sun Mar 06 2022 21:00:00 GMT-0500 (Eastern Standard Time)`), `Don't Starve Together`, `w/ Lazulight & Obsydia`],
[`Finana Ryugu`, new Date(`Mon Mar 07 2022 16:00:00 GMT-0500 (Eastern Standard Time)`), `Honkai Impact`, ``],
[`Finana Ryugu`, new Date(`Tue Mar 08 2022 18:00:00 GMT-0500 (Eastern Standard Time)`), `Yu-gi-oh! Master Duel`, `(Training arc)`],
[`Finana Ryugu`, new Date(`Thu Mar 10 2022 18:00:00 GMT-0500 (Eastern Standard Time)`), `Dead by Daylight`, `w/ Petra, Uki & Rosemi`],
[`Finana Ryugu`, new Date(`Fri Mar 11 2022 16:00:00 GMT-0500 (Eastern Standard Time)`), `Yakuza 0`, `Finale`],
[`Finana Ryugu`, new Date(`Sat Mar 12 2022 18:00:00 GMT-0500 (Eastern Standard Time)`), `Powerwash Simulator`, `w/ Memberfeesh (Finance)`],
[`Ike Eveland`, new Date(`Tue Mar 08 2022 07:00:00 GMT-0500 (Eastern Standard Time)`), `Apex`, ``],
[`Ike Eveland`, new Date(`Wed Mar 09 2022 07:00:00 GMT-0500 (Eastern Standard Time)`), `We were here`, `w/ Mysta`],
[`Ike Eveland`, new Date(`Wed Mar 09 2022 21:00:00 GMT-0500 (Eastern Standard Time)`), `Minecraft`, `World server`],
[`Ike Eveland`, new Date(`Thu Mar 10 2022 07:00:00 GMT-0500 (Eastern Standard Time)`), `Mega man X`, ``],
[`Ike Eveland`, new Date(`Fri Mar 11 2022 16:00:00 GMT-0500 (Eastern Standard Time)`), `Uno Collab`, `w/ Vox, Reimu, Shoto`],
[`Ike Eveland`, new Date(`Sun Mar 13 2022 07:00:00 GMT-0400 (Eastern Daylight Saving Time)`), `Super Chat reading`, ``],
[`Luca Kaneshiro`, new Date(`Mon Mar 07 2022 23:00:00 GMT-0500 (Eastern Standard Time)`), `300k VR fullbody`, ``],
[`Luca Kaneshiro`, new Date(`Tue Mar 08 2022 23:00:00 GMT-0500 (Eastern Standard Time)`), `The Walking Dead`, ``],
[`Luca Kaneshiro`, new Date(`Wed Mar 09 2022 21:00:00 GMT-0500 (Eastern Standard Time)`), `Minecraft`, `Niji World server`],
[`Luca Kaneshiro`, new Date(`Fri Mar 11 2022 01:00:00 GMT-0500 (Eastern Standard Time)`), `Comfy Voice AMA`, ``],
[`Luca Kaneshiro`, new Date(`Fri Mar 11 2022 23:00:00 GMT-0500 (Eastern Standard Time)`), `Elden Ring`, ``],
[`Luca Kaneshiro`, new Date(`Sun Mar 13 2022 00:00:00 GMT-0500 (Eastern Standard Time)`), `Dark Deception`, `pt. 2`],
[`Millie Parfait`, new Date(`Mon Mar 07 2022 14:00:00 GMT-0500 (Eastern Standard Time)`), `Bastion`, ``],
[`Millie Parfait`, new Date(`Tue Mar 08 2022 20:00:00 GMT-0500 (Eastern Standard Time)`), `Worms`, `Niji EN`],
[`Millie Parfait`, new Date(`Wed Mar 09 2022 14:00:00 GMT-0500 (Eastern Standard Time)`), `WilderMyth`, ``],
[`Millie Parfait`, new Date(`Thu Mar 10 2022 14:00:00 GMT-0500 (Eastern Standard Time)`), `PYRE`, ``],
[`Millie Parfait`, new Date(`Fri Mar 11 2022 14:00:00 GMT-0500 (Eastern Standard Time)`), `PYRE #2`, ``],
[`Millie Parfait`, new Date(`Sat Mar 12 2022 14:00:00 GMT-0500 (Eastern Standard Time)`), `One Step from Eden`, ``],
[`Mysta Rias`, new Date(`Tue Mar 08 2022 08:00:00 GMT-0500 (Eastern Standard Time)`), `#Mysmi`, `Keep Talking and Nobody Explodes`],
[`Mysta Rias`, new Date(`Wed Mar 09 2022 07:00:00 GMT-0500 (Eastern Standard Time)`), `We Were Here`, `Ike Collab`],
[`Mysta Rias`, new Date(`Thu Mar 10 2022 09:00:00 GMT-0500 (Eastern Standard Time)`), `Apex Legends`, `Vox, Rpr Collab`],
[`Mysta Rias`, new Date(`Fri Mar 11 2022 07:00:00 GMT-0500 (Eastern Standard Time)`), `Karaoke?????`, `if everything goes to plan`],
[`Mysta Rias`, new Date(`Sat Mar 12 2022 07:00:00 GMT-0500 (Eastern Standard Time)`), `Night Delivery`, `No talking/Harmonica in mouth`],
[`Petra Gurin`, new Date(`Sun Mar 06 2022 21:00:00 GMT-0500 (Eastern Standard Time)`), `Don't Starve TGT`, `w/ Lazusydia`],
[`Petra Gurin`, new Date(`Tue Mar 08 2022 22:00:00 GMT-0500 (Eastern Standard Time)`), `Pokemon Legends: Arceus`, ``],
[`Petra Gurin`, new Date(`Wed Mar 09 2022 22:00:00 GMT-0500 (Eastern Standard Time)`), `Twisted Wonderland`, `w/ Elira`],
[`Petra Gurin`, new Date(`Thu Mar 10 2022 20:00:00 GMT-0500 (Eastern Standard Time)`), `Dead by Daylight`, `w/ Finana, Uki, Rosemi`],
[`Petra Gurin`, new Date(`Fri Mar 11 2022 06:00:00 GMT-0500 (Eastern Standard Time)`), `Payday 2`, `w/ Seffyna, Sera, Kirame`],
[`Petra Gurin`, new Date(`Fri Mar 11 2022 23:00:00 GMT-0500 (Eastern Standard Time)`), `Donation Reading`, `(+ I eat corn cheese ^-^)`],
[`Petra Gurin`, new Date(`Sun Mar 13 2022 07:00:00 GMT-0400 (Eastern Daylight Saving Time)`), `Propnight`, `w/ Reimu, Oliver, Genzuki, Mayuzumi`],
[`Pomu Rainpuff`, new Date(`Sun Mar 06 2022 21:00:00 GMT-0500 (Eastern Standard Time)`), `Don't Starve Together`, `Lazusydia Collab`],
[`Pomu Rainpuff`, new Date(`Mon Mar 07 2022 19:00:00 GMT-0500 (Eastern Standard Time)`), `Fairyoke?!`, ``],
[`Pomu Rainpuff`, new Date(`Tue Mar 08 2022 13:00:00 GMT-0500 (Eastern Standard Time)`), `Yu-go-oh! Master Duel`, ``],
[`Pomu Rainpuff`, new Date(`Wed Mar 09 2022 19:00:00 GMT-0500 (Eastern Standard Time)`), `Zatsudan before break!`, ``],
[`Reimu Endou`, new Date(`Sun Mar 06 2022 18:00:00 GMT-0500 (Eastern Standard Time)`), `Darkest Dungeon`, ``],
[`Reimu Endou`, new Date(`Tue Mar 08 2022 16:00:00 GMT-0500 (Eastern Standard Time)`), `Pokemon Legends Arceus`, ``],
[`Reimu Endou`, new Date(`Tue Mar 08 2022 20:00:00 GMT-0500 (Eastern Standard Time)`), `Worms Armageddon`, `Collab`],
[`Reimu Endou`, new Date(`Thu Mar 10 2022 16:00:00 GMT-0500 (Eastern Standard Time)`), `Apex Legends`, `w/ Sonny, Uki`],
[`Reimu Endou`, new Date(`Fri Mar 11 2022 11:00:00 GMT-0500 (Eastern Standard Time)`), `Path of Exile`, ``],
[`Reimu Endou`, new Date(`Fri Mar 11 2022 16:00:00 GMT-0500 (Eastern Standard Time)`), `UNO`, `w/ Vox, Ike, Shoto`],
[`Reimu Endou`, new Date(`Sat Mar 12 2022 13:00:00 GMT-0500 (Eastern Standard Time)`), `Karaoke`, ``],
[`Reimu Endou`, new Date(`Sat Mar 12 2022 22:00:00 GMT-0500 (Eastern Standard Time)`), `The lighthouse`, `Members only watchalong`],
[`Rosemi Lovelock`, new Date(`Mon Mar 07 2022 20:00:00 GMT-0500 (Eastern Standard Time)`), `The Walking Dead S2`, `Finishing season 2`],
[`Rosemi Lovelock`, new Date(`Tue Mar 08 2022 20:00:00 GMT-0500 (Eastern Standard Time)`), `Worms Armageddon`, `With Selen, Millie, Reimu, Shu and Elira`],
[`Rosemi Lovelock`, new Date(`Thu Mar 10 2022 12:00:00 GMT-0500 (Eastern Standard Time)`), `YGO! MD`, ``],
[`Rosemi Lovelock`, new Date(`Thu Mar 10 2022 20:00:00 GMT-0500 (Eastern Standard Time)`), `DbD Collab`, `w/ Finana, Uki and Petra`],
[`Rosemi Lovelock`, new Date(`Fri Mar 11 2022 19:00:00 GMT-0500 (Eastern Standard Time)`), `Rosemi Zatsudan`, ``],
[`Selen Tatsuki`, new Date(`Sun Mar 06 2022 21:00:00 GMT-0500 (Eastern Standard Time)`), `Don't Starve Together`, `w/ Lazusydia`],
[`Selen Tatsuki`, new Date(`Mon Mar 07 2022 15:00:00 GMT-0500 (Eastern Standard Time)`), `Apex Solo Rank`, `Gold to Plat?`],
[`Selen Tatsuki`, new Date(`Mon Mar 07 2022 22:30:00 GMT-0500 (Eastern Standard Time)`), `Demon's Souls`, `on twitch`],
[`Selen Tatsuki`, new Date(`Tue Mar 08 2022 19:00:00 GMT-0500 (Eastern Standard Time)`), `Worms Armageddon`, ``],
[`Selen Tatsuki`, new Date(`Thu Mar 10 2022 20:00:00 GMT-0500 (Eastern Standard Time)`), `Apex Legends`, `w/ Fulgur & Alban`],
[`Selen Tatsuki`, new Date(`Fri Mar 11 2022 18:00:00 GMT-0500 (Eastern Standard Time)`), `Control`, ``],
[`Selen Tatsuki`, new Date(`Sat Mar 12 2022 15:00:00 GMT-0500 (Eastern Standard Time)`), `200k Celebration`, `ASMR prison break`],
[`Shu Yamino`, new Date(`Mon Mar 07 2022 15:00:00 GMT-0500 (Eastern Standard Time)`), `Yu-Gi-Oh Master Duel`, ``],
[`Shu Yamino`, new Date(`Tue Mar 08 2022 20:00:00 GMT-0500 (Eastern Standard Time)`), `Worms Armageddon (No POV)`, `ft. Rosemi, Selen, Millie, Reimu, Elira`],
[`Shu Yamino`, new Date(`Wed Mar 09 2022 21:00:00 GMT-0500 (Eastern Standard Time)`), `NijiWorld Minecraft Server`, `ft. Luca & Ike`],
[`Shu Yamino`, new Date(`Fri Mar 11 2022 18:00:00 GMT-0500 (Eastern Standard Time)`), `Project Zomboid`, `First time!`],
[`Shu Yamino`, new Date(`Sat Mar 12 2022 07:00:00 GMT-0500 (Eastern Standard Time)`), `Pokemon Legends: Arceus`, `Post-Game chill!`],
[`Shu Yamino`, new Date(`Sun Mar 13 2022 17:00:00 GMT-0400 (Eastern Daylight Saving Time)`), `TBD!! - something`, ``],
[`Vox Akuma`, new Date(`Mon Mar 07 2022 06:00:00 GMT-0500 (Eastern Standard Time)`), `400k after party`, ``],
[`Vox Akuma`, new Date(`Wed Mar 09 2022 08:00:00 GMT-0500 (Eastern Standard Time)`), `Study with Vox ASMR`, ``],
[`Vox Akuma`, new Date(`Wed Mar 09 2022 16:00:00 GMT-0500 (Eastern Standard Time)`), `Smash vs Fulgur`, ``],
[`Vox Akuma`, new Date(`Thu Mar 10 2022 08:00:00 GMT-0500 (Eastern Standard Time)`), `Apex`, `w/ Mysta & RPR`],
[`Vox Akuma`, new Date(`Fri Mar 11 2022 09:00:00 GMT-0500 (Eastern Standard Time)`), `Sims 4`, `The Fated Party`],
[`Vox Akuma`, new Date(`Sat Mar 12 2022 08:00:00 GMT-0500 (Eastern Standard Time)`), `FNAF`, `10/20 Attempts`],
[`Vox Akuma`, new Date(`Sun Mar 13 2022 09:00:00 GMT-0400 (Eastern Daylight Saving Time)`), `Duolingo`, ``]
];
