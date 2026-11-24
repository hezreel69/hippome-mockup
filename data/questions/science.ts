import { DifficultyLevel, Question } from "@/types/hippome";
import { buildNumericQuestion, expandQuestions } from "./helpers";

export function getScienceQuestions(
  topicId: string,
  level: DifficultyLevel,
  variantSeed: number
): Question[] {
  if (topicId === "microorganisms") {
    if (level === "beginner") {
      return expandQuestions("science", "microorganisms", "beginner", [
        ["1", "Which group of microorganisms lacks a cellular structure and only reproduces inside living host cells?", ["Viruses", "Bacteria", "Fungi", "Protozoa"], 0, "Viruses are non-cellular and require a living host cell to replicate."],
        ["2", "What are the two main shapes of bacteria known as coccus and bacillus?", ["Spherical and rod-shaped", "Spiral and comma-shaped", "Star and cube-shaped", "Thread and ring-shaped"], 0, "Coccus bacteria are spherical while bacillus bacteria are rod-shaped."],
        ["3", "Which microorganism is used in making yoghurt from milk?", ["Lactobacillus bacteria", "Plasmodium protozoa", "Influenza virus", "Mucor fungus"], 0, "Lactobacillus ferments lactose in milk into lactic acid to produce yoghurt."],
        ["4", "Which gas produced by yeast causes bread dough to rise?", ["Carbon dioxide", "Oxygen", "Nitrogen", "Hydrogen"], 0, "Yeast respires anaerobically to release carbon dioxide bubbles."],
        ["5", "Which environmental factor slows down bacterial growth when food is stored in a refrigerator at 4 °C?", ["Low temperature", "High humidity", "Bright light", "Neutral pH"], 0, "Low temperature slows enzyme activity and reduces bacterial reproduction rate."],
        ["6", "Penicillin, the first widely used antibiotic, is extracted from which type of microorganism?", ["Fungus (Penicillium)", "Bacterium", "Protozoan", "Virus"], 0, "Penicillin comes from the mould Penicillium notatum."],
        ["7", "Which method uses hand soap or alcohol hand rub to reduce microbes on skin before a medical procedure?", ["Antiseptic / Aseptic hygiene", "Boiling at 100 °C", "Gamma irradiation", "Autoclaving"], 0, "Antiseptics safely kill or inhibit microorganisms on living skin tissue."],
        ["8", "Algae such as Chlorella and Spirogyra can make their own food because they contain:", ["Chlorophyll", "Pseudopodia", "Flagella", "Capsid protein"], 0, "Algae possess chlorophyll and carry out photosynthesis."],
        ["9", "Which disease is caused by a virus?", ["Dengue fever", "Tuberculosis", "Malaria", "Ringworm (kurap)"], 0, "Dengue is caused by the dengue virus transmitted by Aedes mosquitoes."],
        ["10", "Where do saprophytic fungi obtain their nutrients from?", ["Dead and decaying organic matter", "Photosynthesis in sunlight", "Red blood cells only", "Pure distilled water"], 0, "Saprophytic fungi secrete enzymes onto dead organic matter and absorb nutrients."],
      ]);
    }
    if (level === "intermediate") {
      return expandQuestions("science", "microorganisms", "intermediate", [
        ["1", "Why do most pathogenic bacteria grow poorly in pickled mangoes soaked in vinegar?", ["Vinegar creates an acidic pH that inhibits bacterial enzymes", "Vinegar raises the temperature above 80 °C", "Vinegar supplies extra oxygen", "Vinegar turns bacteria into algae"], 0, "Most bacteria thrive near neutral pH 7; acidic vinegar denatures enzymes and inhibits growth."],
        ["2", "What is the role of an antibiotic such as penicillin when treating bacterial infections?", ["It kills or inhibits bacteria, NOT viruses", "It destroys both viruses and fungi equally", "It boosts stomach acid only", "It acts as a vaccine for future immunity"], 0, "Antibiotics target bacterial cell walls or metabolism and are ineffective against viruses."],
        ["3", "In an experiment measuring antibiotic effectiveness on nutrient agar, what indicates the most effective antibiotic disc?", ["The widest clear zone around the disc", "The cloudiest agar around the disc", "A colour change from blue to red", "Zero clear zone around the disc"], 0, "A wider clear zone means more bacteria were killed or inhibited around that disc."],
        ["4", "Why must a patient complete the full prescribed course of antibiotics even after feeling better?", ["To eliminate remaining bacteria and prevent antibiotic-resistant strains", "To turn bacteria into beneficial yeast", "To lower blood glucose levels", "To reduce vitamin C absorption"], 0, "Stopping early leaves partially resistant bacteria alive to multiply."],
        ["5", "How do Eco-enzymes produced from fermented fruit waste benefit household cleaning?", ["Useful microbes break down grease and organic dirt naturally", "They sterilise metal at 121 °C", "They bleach fabrics with chlorine gas", "They freeze wastewater instantly"], 0, "Eco-enzymes contain organic acids and enzymes from microbial fermentation."],
        ["6", "Why is distilled water NOT suitable as the control medium in an antibiotic disc test?", ["Nutrient agar is needed to support bacterial lawn growth so clear zones are visible", "Distilled water turns agar solid permanently", "Bacteria only grow in concentrated salt", "Distilled water acts as a strong antibiotic"], 0, "A sterile blank paper disc on nutrient agar acts as the proper negative control."],
        ["7", "Which temperature range is optimal for most human pathogenic bacteria?", ["35 °C – 40 °C", "0 °C – 4 °C", "70 °C – 85 °C", "110 °C – 121 °C"], 0, "Human pathogens thrive near human body temperature (~37 °C)."],
        ["8", "Why does keeping dried salted fish prevent spoilage for months?", ["Salt removes moisture via osmosis and lowers water content", "Salt adds nitrogen gas", "Salt raises pH to 14", "Salt creates anaerobic yeast"], 0, "Microorganisms cannot survive or reproduce without sufficient moisture."],
        ["9", "What distinguishes disinfectants from antiseptics?", ["Disinfectants are used on non-living surfaces; antiseptics are safe on living tissue", "Antiseptics are only for hospital floors", "Disinfectants are edible", "There is no difference"], 0, "Disinfectants are too harsh for skin and are meant for objects/surfaces."],
        ["10", "Which microorganism is classified under protozoa and causes malaria?", ["Plasmodium", "Vibrio cholerae", "Candida", "Hepatitis B"], 0, "Plasmodium is a parasitic protozoan transmitted by female Anopheles mosquitoes."],
      ]);
    }
    // Advanced microorganisms (mix of KBAT + bacterial growth calculation)
    const curated = expandQuestions("science", "microorganisms", "advanced", [
      ["1", "In an autoclave sterilisation test, why is boiling water at 100 °C sometimes insufficient for surgical instruments?", ["Bacterial endospores can survive 100 °C and require 121 °C pressurised steam", "100 °C increases viral replication", "Boiling water rusts plastic instantly", "Fungi only die at 0 °C"], 0, "Pressurised steam at 121 °C destroys heat-resistant bacterial spores."],
      ["2", "A student observes mold growing faster inside a sealed warm bread bag than on toasted dry bread in an open jar. Which two factors explain this?", ["Higher moisture content and optimal warmth inside the sealed bag", "Ultraviolet radiation and dry air", "High acidity and low humidity", "Zero oxygen and freezing temperature"], 0, "Mould thrives in warm, moist conditions present in fresh sealed bread."],
      ["3", "Why do doctors prescribe antifungal cream rather than oral antibiotics for athlete's foot (tinea pedis)?", ["Antibiotics target bacteria and have no effect on fungal infections", "Fungi digest antibiotics into glucose", "Antifungal creams kill viruses faster", "Antibiotics increase skin moisture"], 0, "Athlete's foot is caused by fungi, requiring antifungal medication."],
      ["4", "During sewage treatment, aerobic bacteria are pumped with air in aeration tanks. Why?", ["To accelerate decomposition of organic waste into harmless substances", "To kill all fish in nearby rivers", "To convert nitrates back into toxic ammonia", "To stop all microbial enzyme activity"], 0, "Aerobic microbes need oxygen to efficiently break down organic sewage."],
    ]);

    const dynamic: Question[] = [];
    for (let i = 0; i < 6; i++) {
      const n = variantSeed * 6 + i;
      const startPop = (1 + (n % 4)) * 100;
      const divisions = 3 + (n % 3);
      const intervalMin = 20;
      const totalMin = divisions * intervalMin;
      const finalPop = startPop * Math.pow(2, divisions);

      dynamic.push(
        buildNumericQuestion({
          id: `science-microorganisms-advanced-dyn-${n}`,
          subjectId: "science",
          topicId: "microorganisms",
          level: "advanced",
          prompt: `A bacterial culture starts with ${startPop} cells and divides by binary fission every ${intervalMin} minutes under optimal conditions. How many cells will be present after ${totalMin} minutes?`,
          correctLabel: `${finalPop.toLocaleString()} cells`,
          distractorLabels: [
            `${(startPop * divisions * 2).toLocaleString()} cells`,
            `${(finalPop / 2).toLocaleString()} cells`,
            `${(finalPop * 2).toLocaleString()} cells`,
          ],
          explanation: `Number of divisions = ${totalMin} / ${intervalMin} = ${divisions}. Final count = ${startPop} × 2^${divisions} = ${finalPop.toLocaleString()} cells.`,
          hint: "Each division doubles the population (N × 2^n).",
        })
      );
    }
    return [...curated, ...dynamic];
  }

  if (topicId === "nutrition-food-tech") {
    if (level === "beginner") {
      return expandQuestions("science", "nutrition-food-tech", "beginner", [
        ["1", "Which nutrient provides the highest calorific value per gram (about 37–38 kJ/g)?", ["Fats", "Carbohydrates", "Proteins", "Vitamins"], 0, "Fats provide roughly 38 kJ/g, more than double carbohydrates or proteins (17 kJ/g)."],
        ["2", "What instrument is used in the laboratory to measure the energy value of food samples?", ["Bomb calorimeter", "Barometer", "Hydrometer", "Galvanometer"], 0, "A bomb calorimeter measures heat released when a food sample is completely burnt."],
        ["3", "Which deficiency disease results from a lack of iodine in the diet?", ["Goitre", "Scurvy", "Rickets", "Anaemia"], 0, "Iodine deficiency causes enlargement of the thyroid gland (goitre)."],
        ["4", "Which food processing method removes water from fish or fruit using warm air or sunlight?", ["Dehydration / Drying", "Pasteurisation", "Vacuum packaging", "Canning"], 0, "Drying removes water so microorganisms cannot grow."],
        ["5", "Why is pasteurised milk stored in a refrigerator even after heat treatment?", ["Pasteurisation kills pathogens but not bacterial spores", "Pasteurisation freezes the milk", "Milk contains zero water", "Spores turn into vitamins at room temperature"], 0, "Pasteurisation (63 °C or 72 °C) kills active pathogens, leaving spores that must be kept cold."],
        ["6", "Which plant nutrient is essential for healthy leaf growth and chlorophyll formation?", ["Nitrogen", "Calcium", "Sodium", "Lead"], 0, "Nitrogen deficiency causes stunted growth and yellow leaves (chlorosis)."],
        ["7", "Which food additive prevents oil-and-water mixtures in mayonnaise from separating?", ["Emulsifier", "Sweetener", "Bleaching agent", "Antioxidant"], 0, "Emulsifiers (like lecithin) stabilise mixtures of immiscible liquids."],
        ["8", "What does the 'Pinggan Sihat Malaysia' (Quarter-Quarter-Half) guideline recommend for half the plate?", ["Fruits and vegetables", "Rice and noodles", "Fried chicken and butter", "Carbonated drinks"], 0, "Half the plate should be filled with fruits and vegetables."],
        ["9", "Which organism converts nitrate ions in waterlogged soil back into nitrogen gas?", ["Denitrifying bacteria", "Nitrogen-fixing bacteria", "Nitrifying bacteria", "Yeast"], 0, "Denitrifying bacteria reduce nitrates back into atmospheric nitrogen gas."],
        ["10", "Which health condition is strongly linked to prolonged excessive intake of saturated fats and cholesterol?", ["Atherosclerosis / Heart disease", "Night blindness", "Kwashiorkor", "Beriberi"], 0, "Excess cholesterol deposits narrow arteries, leading to atherosclerosis."],
      ]);
    }

    if (level === "intermediate") {
      const curated = expandQuestions("science", "nutrition-food-tech", "intermediate", [
        ["1", "Why do teenagers and manual labourers require higher daily energy intake than elderly office workers?", ["Higher growth rate and greater physical activity burn more energy", "They absorb fewer vitamins", "Their body temperature is 50 °C", "They cannot digest protein"], 0, "Energy needs depend on age, sex, body size, and physical activity level."],
        ["2", "How does Ultra-High Temperature (UHT) treatment allow boxed milk to stay fresh for months without refrigeration?", ["Milk is heated to 135 °C for 2 seconds, killing both bacteria and spores", "Milk is frozen at -40 °C", "Sugar replaces all water", "All calcium is removed"], 0, "UHT destroys microorganisms and spores, and aseptic packaging blocks re-entry."],
        ["3", "Which sequence correctly shows nitrification in the nitrogen cycle?", ["Ammonium compounds → Nitrites → Nitrates", "Nitrates → Nitrogen gas → Ammonia", "Proteins → Carbohydrates → Fats", "Oxygen → Carbon dioxide → Nitrates"], 0, "Nitrifying bacteria oxidise ammonium to nitrites and then to nitrates."],
        ["4", "Why is vacuum packaging combined with chilling effective for preserving sliced beef?", ["Removing oxygen prevents aerobic microbes while chilling slows remaining growth", "It turns beef into plant fibre", "It raises food pH above 12", "It radiates X-rays continuously"], 0, "Depriving aerobic microbes of oxygen and keeping temperatures low slows spoilage."],
      ]);

      const dynamic: Question[] = [];
      for (let i = 0; i < 6; i++) {
        const n = variantSeed * 6 + i;
        const carb = 40 + (n % 5) * 5;
        const prot = 10 + (n % 4) * 2;
        const fat = 5 + (n % 4) * 2;
        const total = carb * 17 + prot * 17 + fat * 38;

        dynamic.push(
          buildNumericQuestion({
            id: `science-nutrition-food-tech-intermediate-dyn-${n}`,
            subjectId: "science",
            topicId: "nutrition-food-tech",
            level: "intermediate",
            prompt: `A meal contains ${carb} g carbohydrate (17 kJ/g), ${prot} g protein (17 kJ/g), and ${fat} g fat (38 kJ/g). Calculate its total calorific value.`,
            correctLabel: `${total.toLocaleString()} kJ`,
            distractorLabels: [
              `${(carb * 17 + prot * 17 + fat * 17).toLocaleString()} kJ`,
              `${(total + 210).toLocaleString()} kJ`,
              `${(total - 170).toLocaleString()} kJ`,
            ],
            explanation: `(${carb}×17) + (${prot}×17) + (${fat}×38) = ${carb * 17} + ${prot * 17} + ${fat * 38} = ${total.toLocaleString()} kJ.`,
          })
        );
      }
      return [...curated, ...dynamic];
    }

    // Advanced nutrition & food tech
    const curated = expandQuestions("science", "nutrition-food-tech", "advanced", [
      ["1", "In a bomb calorimeter experiment, 0.5 g of cashew nut raises the temperature of 200 g water from 28 °C to 43 °C (specific heat capacity = 4.2 J/g°C). Calculate the energy value of the cashew nut in kJ/g.", ["25.2 kJ/g", "12.6 kJ/g", "6.3 kJ/g", "50.4 kJ/g"], 0, "Heat = 200 × 4.2 × 15 = 12,600 J = 12.6 kJ for 0.5 g → 12.6 / 0.5 = 25.2 kJ/g."],
      ["2", "Why do farmers rotate leguminous crops like groundnuts with maize even without adding heavy chemical fertilisers?", ["Rhizobium in legume root nodules enriches soil with nitrates for the next crop", "Maize kills all bacteria in soil", "Legumes absorb oxygen from rocks", "Soil temperature drops permanently"], 0, "Legumes replenish soil nitrogen compounds naturally via nitrogen fixation."],
      ["3", "Which food label detail is MANDATORY under Malaysian Food Regulations 1985 to protect consumers with allergies or dietary restrictions?", ["Ingredient list in descending weight order, expiry date, and manufacturer details", "Only the celebrity ambassador's name", "Recipe instructions only", "Wholesale factory cost"], 0, "Malaysian food regulations require clear ingredient lists, expiry dates, and packer/manufacturer info."],
      ["4", "Why can overuse of synthetic nitrites as preservatives in processed meats pose health risks?", ["Nitrites can form carcinogenic nitrosamines when heated or digested", "Nitrites turn into pure vitamin D", "Nitrites freeze blood cells", "Nitrites remove all sodium"], 0, "Excess nitrites can react with amines to form potentially carcinogenic nitrosamines."],
    ]);

    const dynamic: Question[] = [];
    for (let i = 0; i < 6; i++) {
      const n = variantSeed * 6 + i;
      const massFood = 1 + (n % 2);
      const waterG = 100;
      const deltaT = 10 + (n % 5) * 2;
      const totalJ = waterG * 4.2 * deltaT;
      const kjPerG = Number((totalJ / 1000 / massFood).toFixed(2));

      dynamic.push(
        buildNumericQuestion({
          id: `science-nutrition-food-tech-advanced-dyn-${n}`,
          subjectId: "science",
          topicId: "nutrition-food-tech",
          level: "advanced",
          prompt: `Burning ${massFood} g of peanut completely heats ${waterG} g of water by ${deltaT} °C (specific heat capacity of water = 4.2 J/g°C). Calculate the energy value of the peanut in kJ/g.`,
          correctLabel: `${kjPerG} kJ/g`,
          distractorLabels: [
            `${Number((kjPerG * 2).toFixed(2))} kJ/g`,
            `${Number((kjPerG / 2).toFixed(2))} kJ/g`,
            `${Number((kjPerG + 3.4).toFixed(2))} kJ/g`,
          ],
          explanation: `Energy = (${waterG} × 4.2 × ${deltaT}) / 1000 = ${(totalJ / 1000).toFixed(2)} kJ. Divided by ${massFood} g = ${kjPerG} kJ/g.`,
        })
      );
    }
    return [...curated, ...dynamic];
  }

  // Carbon compounds
  if (level === "beginner") {
    return expandQuestions("science", "carbon-compounds", "beginner", [
      ["1", "What elements make up hydrocarbons?", ["Carbon and hydrogen only", "Carbon, hydrogen, and oxygen", "Carbon and nitrogen only", "Hydrogen and oxygen only"], 0, "Hydrocarbons are organic compounds containing carbon and hydrogen atoms only."],
      ["2", "Which raw material is commonly fermented by yeast to produce bioethanol?", ["Glucose / Sugar cane / Starch", "Crude petroleum gas", "Silica sand", "Sodium chloride"], 0, "Fermentation converts sugars such as glucose into ethanol and carbon dioxide."],
      ["3", "Which characteristic describes saturated fats compared to unsaturated fats?", ["Solid at room temperature and single C-C bonds", "Liquid at room temperature with many double bonds", "Found only in olive oil", "Zero carbon atoms"], 0, "Saturated fats have single bonds between carbon atoms and are usually solid at room temperature."],
      ["4", "In palm oil milling, which part of the oil palm fruit yields palm kernel oil?", ["The inner kernel (seed)", "The outer husk fibre", "The palm frond leaf", "The roots"], 0, "Mesocarp yields palm oil, while the inner kernel yields palm kernel oil."],
      ["5", "Which substance turns cloudy when carbon dioxide from fermentation is bubbled through it?", ["Limewater", "Distilled water", "Ethanol", "Sodium hydroxide solution"], 0, "Carbon dioxide reacts with calcium hydroxide in limewater to form white calcium carbonate precipitate."],
      ["6", "Which everyday product is made from reacting palm oil fatty acids with sodium hydroxide (saponification)?", ["Soap", "Plastic bottle", "Stainless steel", "Table salt"], 0, "Saponification hydrolyses oils/fats with alkali to produce soap and glycerol."],
      ["7", "What is the functional group present in alcohols such as ethanol?", ["Hydroxyl group (-OH)", "Carboxyl group (-COOH)", "Ester group (-COO-)", "Carbon-carbon double bond"], 0, "Alcohols contain the hydroxyl (-OH) functional group."],
      ["8", "Why is ethanol widely used as a solvent in perfumes and medicines?", ["It dissolves both organic oils and mixes with water, and evaporates quickly", "It is denser than mercury", "It freezes at 50 °C", "It has a strong foul odour"], 0, "Ethanol is volatile, miscible with water, and dissolves organic fragrances well."],
      ["9", "Which vitamin is naturally abundant in red palm oil?", ["Vitamin E (tocopherols) and beta-carotene (pro-vitamin A)", "Vitamin C only", "Vitamin B12 only", "Zero vitamins"], 0, "Palm oil is naturally rich in Vitamin E and carotenoids."],
      ["10", "Which separation method purifies ethanol from a fermented glucose mixture?", ["Fractional distillation", "Filtration through sand", "Evaporation to dryness", "Sublimation"], 0, "Ethanol (b.p. ~78 °C) is separated from water (100 °C) by fractional distillation."],
    ]);
  }

  if (level === "intermediate") {
    return expandQuestions("science", "carbon-compounds", "intermediate", [
      ["1", "During oil palm fruit processing, why are bunches sterilised with steam before stripping?", ["To kill fungi/bacteria and soften fruits while preventing enzyme-driven oil rancidity", "To turn palm oil into soap", "To freeze the kernel", "To evaporate all oil"], 0, "Steam sterilisation inactivates lipase enzymes that cause free fatty acids (rancidity) and loosens fruitlets."],
      ["2", "Which pair of reactants produces ethyl ethanoate in esterification?", ["Ethanol and ethanoic acid", "Methane and water", "Ethene and oxygen", "Glycerol and sodium hydroxide"], 0, "Ethanol (alcohol) + ethanoic acid (carboxylic acid) → ethyl ethanoate (ester) + water."],
      ["3", "How does a soap molecule remove grease stains from cloth in water?", ["Its hydrophobic tail dissolves in grease while its hydrophilic head dissolves in water", "It bleaches cloth with oxygen gas", "It melts cotton fibres", "It freezes grease solid"], 0, "Soap acts as an emulsifier lifting grease droplets into water."],
      ["4", "Why is excessive alcohol consumption harmful to the human liver?", ["The liver breaks down ethanol into toxic products, leading to fatty liver and cirrhosis", "Ethanol turns into calcium stones immediately", "Alcohol evaporates inside lungs only", "It causes goitre"], 0, "Chronic alcohol abuse damages hepatocytes and causes liver cirrhosis."],
      ["5", "In the carbon cycle, how do green plants reduce atmospheric carbon dioxide?", ["Photosynthesis", "Combustion", "Fermentation", "Respiration"], 0, "Green plants absorb CO2 during photosynthesis to form carbohydrates."],
      ["6", "What physical property makes esters useful in food flavourings and cosmetics?", ["They are volatile liquids with pleasant fruity smells", "They are heavy black solids", "They react violently with water", "They conduct electricity strongly"], 0, "Esters typically have sweet, fruity aromas."],
      ["7", "Why does palm oil have better thermal stability for deep-frying than soybean oil?", ["Balanced saturated and monounsaturated fatty acids resist oxidation at high heat", "Palm oil boils at 50 °C", "Palm oil contains zero glycerol", "Palm oil is 90% water"], 0, "Palm oil resists thermal oxidation well at frying temperatures."],
      ["8", "What happens when a palm oil molecule undergoes hydrolysis with potassium hydroxide?", ["Potassium salt of fatty acid (soft soap) and glycerol are formed", "Pure ethanol is produced", "Methane gas explodes", "Glucose is crystallised"], 0, "Alkaline hydrolysis (saponification) yields soap and glycerol."],
      ["9", "Which separation step removes solid fibres and shell fragments after pressing oil palm mesocarp?", ["Screening / Clarification and centrifugation", "Electrolysis", "Chromatography", "Fermentation"], 0, "Clarification tanks and centrifuges separate crude palm oil from water and sludge."],
      ["10", "Which statement distinguishes inorganic carbon compounds from organic carbon compounds?", ["Most organic compounds contain carbon bonded to hydrogen (e.g. hydrocarbons, alcohols), whereas carbonates/CO2 are inorganic", "Organic compounds never contain oxygen", "Inorganic compounds never contain carbon", "There is no distinction"], 0, "Oxides of carbon and carbonates are classified as inorganic carbon compounds."],
    ]);
  }

  return expandQuestions("science", "carbon-compounds", "advanced", [
    ["1", "Why should fractional distillation of fermented ethanol stop when the thermometer at the fractionating column rises sharply past 80 °C?", ["Beyond 78–80 °C, mostly water vapour distils over and dilutes the ethanol", "Ethanol solidifies above 80 °C", "The Liebig condenser turns into limewater", "Yeast grows faster at 100 °C"], 0, "Pure ethanol boils at ~78 °C; higher temperatures indicate water is passing over."],
    ["2", "A student mixes ethanol, ethanoic acid, and a few drops of concentrated H2SO4 in a boiling tube and heats it in a water bath. Why is a water bath used instead of a direct Bunsen flame?", ["Ethanol is highly flammable and heating evenly in a water bath prevents ignition", "Concentrated H2SO4 freezes under direct flame", "Water bath turns the ester into soap", "Direct flame produces carbon dioxide only"], 0, "Ethanol vapour is flammable, so indirect heating with a water bath is safer."],
    ["3", "In sustainable palm oil production (MSPO), why is Palm Oil Mill Effluent (POME) treated in anaerobic digesters before discharge?", ["To capture methane biogas for energy and prevent river eutrophication/oxygen depletion", "To add extra grease to rivers", "To convert water into crude petroleum", "To increase acidity of streams"], 0, "Treating POME recovers methane biogas and lowers biological oxygen demand (BOD)."],
    ["4", "Why is palm oil chemically modified into biodiesel (methyl esters) via transesterification rather than burned raw in modern diesel engines?", ["Methyl esters have lower viscosity for clean fuel injection and combustion", "Raw palm oil freezes at 100 °C", "Biodiesel contains zero carbon", "Transesterification adds water to fuel"], 0, "Transesterification lowers viscosity to match standard diesel fuel characteristics."],
    ["5", "How do antioxidants naturally present in palm oil (tocotrienols) protect body cells?", ["They neutralise harmful free radicals and reduce oxidative stress", "They raise blood cholesterol rapidly", "They digest bacterial spores", "They replace red blood cells"], 0, "Tocotrienols act as lipid-soluble antioxidants."],
    ["6", "During an experiment comparing saturated vs unsaturated oils with bromine water, which observation confirms an oil is unsaturated?", ["Brown bromine water decolourises quickly", "Bromine water turns bright blue", "A white precipitate of soap forms", "Gas bubbles extinguish a glowing splint"], 0, "Double bonds (C=C) in unsaturated fats undergo addition reaction with bromine, decolourising it."],
    ["7", "Why does soap lose effectiveness in hard water containing Ca2+ and Mg2+ ions?", ["Calcium and magnesium ions react with soap to form insoluble scum", "Hard water evaporates soap instantly", "Ca2+ ions increase foam excessively", "Hard water turns soap into ethanol"], 0, "Soap anions precipitate with Ca2+/Mg2+ as grey scum, wasting soap."],
    ["8", "Which two conditions accelerate the fermentation of pineapple juice into ethanol without turning it sour into vinegar?", ["Anaerobic condition (airlock) and warm temperature around 30–37 °C", "Open air exposure and 85 °C boiling", "Adding concentrated H2SO4 at 0 °C", "Exposing to UV sterilisation lamps"], 0, "Yeast ferments anaerobically at ~35 °C; oxygen allows Acetobacter to oxidise ethanol to ethanoic acid (vinegar)."],
    ["9", "Why is concentrated sulphuric acid added in small catalytic amounts during esterification?", ["It acts as both a catalyst and a dehydrating agent shifting equilibrium toward ester formation", "It neutralises the fruity smell", "It provides glucose for yeast", "It freezes water inside the tube"], 0, "Concentrated H2SO4 speeds up the reaction and absorbs water produced."],
    ["10", "Which greenhouse gas trend occurs if peatland forests are cleared recklessly for plantations without sustainable replanting?", ["Loss of carbon sinks and peat oxidation release large amounts of CO2", "Atmospheric oxygen triples overnight", "Nitrogen gas turns into methane", "Oceans freeze rapidly"], 0, "Clearing peatlands releases stored soil carbon and removes photosynthetic carbon sinks."],
  ]);
}
