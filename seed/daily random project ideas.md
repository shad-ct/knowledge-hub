# **September 27, 2026**

# **1\. Building an ESP32 Smart Power Strip From Scratch (Hardware & Electronics)**

* **Source:** [Building An ESP32 Smart Power Strip From Scratch — Hackaday](https://hackaday.com/2020/06/10/building-an-esp32-smart-power-strip-from-scratch/)  
* **Summary:** Maker Md Raz designed a custom three-outlet smart power strip housed in a custom 3D-printed enclosure with panel-mount AC sockets and brass heat-set inserts. An internal AC-DC step-down converter powers an onboard ESP32, which drives three AQH2223 solid-state relays through MOSFET switches with status indicator LEDs. A lightweight local web server hosted directly on the ESP32 lets any device on the local network switch each outlet independently without cloud dependence or external servers.  
* **Difficulty / Time:** Moderate to Advanced (requires caution around mains voltage); roughly 8–12 hours across a weekend.  
* **Tweak It:**  
  * Add an energy-monitoring IC (such as a PZEM-004T or ACS712) to measure voltage, current, and true wattage per outlet, streaming telemetry via MQTT.  
  * Integrate a DS3231 real-time clock (RTC) module so scheduled outlet timers execute autonomously even during home Wi-Fi or router outages.  
  * Build a Flutter mobile companion app with a minimalist dark UI to auto-discover the power strip via mDNS and toggle switches with tactile haptic feedback.

# **2\. Diapasonix: Fretted Capacitive-Touch Synthesizer & MIDI Controller (Music & Performance-Adjacent)**

* **Source:** [DIY Synth Takes Inspiration From Fretted Instruments — Hackaday](https://hackaday.com/2025/12/11/diy-synth-takes-inspiration-from-fretted-instruments/)  
* **Summary:** Maker Turi Scandurra created Diapasonix, a handheld electronic instrument inspired by stringed fretboards using 24 individual capacitive touch pads arranged in four "strings" across six "frets". The touch pads are sensed by dual MPR121 ICs driven by a Raspberry Pi Pico 2 running the open-source AMY additive synthesis engine. It functions as a standalone synth packed with classic Juno-6 and DX7 patches alongside built-in delay and reverb, or as a USB MIDI controller supporting direct note triggers and a guitar-like strumming mode.  
* **Difficulty / Time:** Intermediate; roughly 6–10 hours across circuit assembly, 3D printing/enclosure, and firmware flashing.  
* **Tweak It:**  
  * Swap the Raspberry Pi Pico 2 for an ESP32-S3 to introduce Bluetooth Low Energy (BLE) MIDI, enabling completely wireless operation with mobile DAWs like GarageBand.  
  * Integrate an MPU6050 accelerometer/gyroscope to map pitch bends, vibrato, or filter sweeps to physical device tilt and wrist movements.  
  * Replace the capacitive pads with velocity-sensitive force-sensing resistors (FSRs) to unlock dynamic per-note acoustic expression.

# **3\. Parametric Tessellating Origami Structure with Grasshopper (Paper & Print)**

* **Source:** [Design & Fold a Tessellating Origami Structure With Grasshopper — Instructables](https://www.instructables.com/Design-Fold-a-Tessellating-Origami-Structure-With-/)  
* **Summary:** Design student Rory developed a computational workflow combining Rhino, Grasshopper, and the Crane physics engine to simulate, score, and fold complex kinetic origami tessellations from flat sheets of paper. The digital simulation maps mountain and valley crease lines and tests deformation behavior before generating a 2D vector pattern ready for plotting or manual creasing. Once pre-creased, the paper transforms into an elastic, multi-stable geometric lattice suitable for kinetic sculptures or architectural acoustic paneling.  
* **Difficulty / Time:** Intermediate (requires patience with precision creasing); roughly 3–5 hours.  
* **Tweak It:**  
  * Export the 2D crease pattern directly into a craft cutting machine (like a Cricut) or craft laser cutter to score paper at low power, cutting fabrication time down from hours to minutes.  
  * Make the structure modular by folding interlocking hexagonal paper units instead of a single giant sheet, allowing infinite scalability and easy repair of individual tiles.  
  * Embed conductive copper tape along mountain fold valleys to turn the geometric tessellation into a tactile multi-touch sensory surface or kinetic lamp shade.

# **4\. Homemade Fermented Ginger Bug for Natural Soda (Chemistry/Kitchen Crafts)**

* **Source:** [Ginger Bug — Instructables](https://www.instructables.com/Ginger-Bug/)  
* **Summary:** A kitchen biotechnology project that captures and cultures wild yeasts and lactic acid bacteria living naturally on fresh ginger roots to establish an active "ginger bug" starter. Over 5 to 7 days, daily feedings of raw grated ginger, cane sugar, and dechlorinated water cultivate a vigorous colony of carbonating microbes. The resulting active starter culture is strained and added to fresh fruit juices or steeped herbal teas in flip-top bottles for secondary fermentation, creating naturally effervescent artisanal sodas without commercial brewer's yeast.  
* **Difficulty / Time:** Beginner; roughly 10 minutes of daily active maintenance over 5–7 days.  
* **Tweak It:**  
  * Experiment with alternative carbohydrate sources by swapping white sugar for jaggery, blackstrap molasses, or raw honey to alter the microbial flavor profile and carbonation speed.  
  * Pair secondary fermentation with local aromatic botanicals (such as crushed cardamom pods, lemongrass, or fresh mint) to craft custom regional sodas.  
  * Track fermentation kinetics by measuring pH drop with digital litmus probes and monitoring specific gravity with a hydrometer across fermentation days.

# **5\. Web Serial Terminal: In-Browser Hardware Debugging (Software & Digital)**

* **Source:** [Web Serial Terminal Means It's Always Hacking Time — Hackaday](https://hackaday.com/2022/03/21/web-serial-terminal-means-its-always-hacking-time/)  
* **Summary:** Developer Timonsku created a zero-install, browser-based serial terminal emulator built directly on top of the W3C Web Serial API in modern browsers. The client-side web application connects to local USB-to-UART bridge controllers (such as CH340, CP2102, or FTDI) directly from Chrome or Edge without requiring drivers, native serial software (like PuTTY or minicom), or local installation. It provides interactive baud rate selection, line-ending toggling, hex/ASCII viewing modes, and auto-scroll buffers for microcontrollers like Arduino and ESP32.  
* **Difficulty / Time:** Easy to use; beginner-to-intermediate to build (\~4–6 hours for a frontend developer).  
* **Tweak It:**  
  * Rebuild the frontend using Next.js/React and Tailwind CSS with a brutalist dark theme, adding auto-reconnect and persistent tabbed sessions for multi-device debugging.  
  * Add WebAssembly (Wasm) packet decoders to automatically parse custom binary telemetry streams into real-time interactive SVG graphs.  
  * Package the web interface into an Electron or Tauri desktop wrapper with local logging to SQLite, bridging offline desktop reliability with browser simplicity.

# **Weekly Roundup — September 21 – September 27, 2026**

*Note: This is the inaugural entry of the Daily Random Project Ideas log.*

* **Total Projects Found:** 5 projects across 5 distinct categories (Hardware & Electronics, Music & Performance-Adjacent, Paper & Print, Chemistry/Kitchen Crafts, Software & Digital).  
* **Categories Represented:**  
  * Hardware & Electronics (ESP32 Smart Power Strip)  
  * Music & Performance-Adjacent (Diapasonix Capacitive-Touch Synthesizer)  
  * Paper & Print (Parametric Tessellating Origami)  
  * Chemistry/Kitchen Crafts (Homemade Fermented Ginger Bug)  
  * Software & Digital (In-Browser Web Serial Terminal)  
* **Top Projects Worth Revisiting or Building:**  
  1. **ESP32 Smart Power Strip:** Highly practical for a home workspace or desk setup. Building a custom PCB and local web server gives total control over power management without telemetry or cloud vendor lock-in.  
  2. **Diapasonix Touch Synthesizer:** Exceptional crossover between embedded hardware (RP2040/ESP32, capacitive sensing) and digital audio synthesis. Turning it into a wireless BLE MIDI fretboard makes an ideal weekend build.  
  3. **Web Serial Terminal:** A clean, accessible developer tool that can be extended with a brutalist dashboard to chart live sensor data from IoT boards directly in Chrome.

# **September 28, 2026**

# **1\. Automatic Plant Watering and Soil Moisture Sensing (Garden & Outdoor)**

* **Source:** [Automatic Plant Watering and Soil Moisture Sensing — Instructables](https://www.instructables.com/Automatic-Plant-Watering-and-Soil-Moisture-Sensing/)  
* **Summary:** An automated indoor gardening setup built with an Arduino microcontroller, capacitive soil moisture sensor probe, and a 5V relay module wired to a submersible micro water pump. The system monitors soil moisture levels against a programmable threshold, automatically pumping reservoir water through flexible drip irrigation vinyl tubing when the soil dries out and shutting off once optimal saturation is achieved.  
* **Difficulty / Time:** Beginner to Intermediate; roughly 3–4 hours for circuit wiring, tube routing, and calibration.  
* **Tweak It:**  
  * Swap the Arduino for an ESP32 or ESP8266 and send soil moisture telemetry and watering alerts to a local Home Assistant instance via MQTT.  
  * Add a water reservoir float sensor or ultrasonic depth sensor (HC-SR04) to alert you before the supply bucket runs completely dry.  
  * Implement capacitive soil moisture probes instead of resistive copper traces to prevent rapid electrode corrosion in wet soil over time.

# **2\. Minimalist Hand-Stitched Leather Card Holder (Textiles & Fiber Arts)**

* **Source:** [Let's Make a Leather Card Holder\! — Instructables](https://www.instructables.com/Lets-Make-a-Leather-Card-Holder/)  
* **Summary:** A handmade cardholder crafted from vegetable-tanned leather using cardboard cutting templates, edge skiving, and hand-punched stitching holes. The maker skives down the inner pocket margins to minimize bulk, bonds the layers with non-toxic leather contact adhesive, and hand-stitches the seams with durable waxed nylon thread using a two-needle traditional saddle stitch.  
* **Difficulty / Time:** Beginner; roughly 2–3 hours of patient cutting and hand-stitching.  
* **Tweak It:**  
  * Embed an RFID-blocking aluminum or copper woven fabric lining between the leather layers to shield contactless cards from unwanted scanning.  
  * Stitch a central pull-tab ribbon mechanism to easily eject deeply seated cards with a single upward slide.  
  * Add custom edge burnishing with gum tragacanth and beeswax paired with an edge beveler for a professional, glossy, sealed finish.

# **3\. Electronic Interactive Puzzle Cube (Games & Puzzles)**

* **Source:** [Electronic Puzzle Cube — Instructables](https://www.instructables.com/Electronic-Puzzle-Cube/)  
* **Summary:** A handheld electronic puzzle game enclosed in a compact 3D-printed case featuring an 8x8 WS2812 addressable RGB LED matrix and an onboard microcontroller. Players interact with physical pushbuttons and orientation switches to navigate dynamic LED labyrinth puzzles, memory sequences, and pattern-matching challenges, providing tactile puzzle-box gameplay without mechanical keyways.  
* **Difficulty / Time:** Intermediate; roughly 5–7 hours including 3D printing, circuit soldering, and game logic firmware programming.  
* **Tweak It:**  
  * Swap the discrete tilt switches for an MPU6050 accelerometer/gyroscope to turn the cube into a physics-based marble-in-a-maze game governed by physical gravity.  
  * Add a passive piezo buzzer or DFPlayer Mini audio module to trigger classic 8-bit chip chiptune sound effects upon puzzle completion.  
  * Incorporate an NFC tag inside the lid that unlocks a companion web app puzzle stage on your phone once the physical cube puzzle is solved.

# **4\. Dirt-Cheap \$25 Bluetooth Robot Rover (Hardware & Electronics)**

* **Source:** [A Simple \$25 Robot Based On The ESP32 — Hackaday](https://hackaday.com/2025/10/25/a-simple-25-robot-based-on-the-esp32/)  
* **Summary:** Maker Paul McCabe developed an ultra-budget, two-wheeled robot rover powered by an ESP32 microcontroller, dual yellow DC gearmotors, and a motor driver board mounted onto a rigid cardboard chassis held together with hot glue. The robot runs the open-source Bluepad32 firmware library, allowing direct low-latency wireless remote control from standard Bluetooth gamepads like PlayStation DualShock, Xbox, or Nintendo Switch controllers without needing a custom smartphone app.  
* **Difficulty / Time:** Beginner to Intermediate; roughly 2–4 hours.  
* **Tweak It:**  
  * Design and 3D print a snap-fit modular chassis to replace the cardboard body, integrating dedicated mounting clips for a 18650 Li-ion battery shield with built-in charging.  
  * Mount an HC-SR04 ultrasonic sensor or VL53L0X time-of-flight laser distance sensor to the front bumper to add autonomous obstacle avoidance when gamepad control is released.  
  * Build a web-based telemetry dashboard using WebSockets or WebRTC to stream wheel RPM and battery voltage back to a laptop in real time.

# **5\. French Link Stitch Exposed Spine Bookbinding (Paper & Print)**

* **Source:** [French Link Stitch Bookbinding — Instructables](https://www.instructables.com/French-Link-Stitch-Bookbinding/)  
* **Summary:** A classic decorative bookbinding method that binds multiple folded paper signatures into a lay-flat journal using the French link stitch across an exposed spine. Heavy bookboard is covered in decorative book cloth or marbled paper for the front and back hardcovers, and waxed linen thread is sewn through signature punching templates to interlock adjacent sections in an elegant braided pattern that requires no spine glue and allows the book to lay completely flat on a desk.  
* **Difficulty / Time:** Beginner to Intermediate; roughly 2–3 hours.  
* **Tweak It:**  
  * Interleave alternating signatures of watercolor paper, dotted grid paper, and toned kraft paper to create a versatile multi-medium creative journal.  
  * Thread decorative glass or wooden spacer beads into the exposed spine links during the sewing process for an ornamental visual accent.  
  * Combine with an elastic ribbon closure recessed into the back cover board with a ribbon bookmark attached to the top tailband.

# **September 29, 2026**

# **1\. Squeal & Scrape: DIY Piezo Contact Microphone & Overdrive Instrument (Music & Performance-Adjacent)**

* **Source:** [Squeal & Scrape (10 Acres of Sound Version) — Instructables](https://www.instructables.com/Squeal-Scrape-10-Acres-of-Sound-Version/)  
* **Summary:** An experimental acoustic-noise synthesizer built using a standard brass piezo disc element as a contact microphone wired to an LM386 audio amplifier circuit and an onboard loudspeaker. By coupling the contact mic physically to vibrating objects, springs, or the speaker cone itself, the device creates controllable acoustic feedback ("squeal") and aggressive overdriven friction textures ("scrape") that turn physical surface vibrations into soundscapes.  
* **Difficulty / Time:** Beginner; roughly 2–3 hours of circuit assembly and basic soldering.  
* **Tweak It:**  
  * Add an inline passive low-pass RC filter and a 10k potentiometer to tame harsh screeching frequencies and shape the acoustic resonance curve.  
  * Encase the piezo disc in a thin waterproof layer of silicone or liquid rubber (Plasti-Dip) to turn it into an underwater hydrophone.  
  * Route the line output into a microcontroller (like an RP2040 or Teensy) running micro-delay or pitch-shift DSP effects before the audio hits the speaker.

# **2\. Cold Process Soap Making with Natural Plant Oils (Chemistry/Kitchen Crafts)**

* **Source:** [Making Cold Process Soap — Instructables](https://www.instructables.com/Making-Cold-Process-Soap/)  
* **Summary:** A fundamental kitchen chemistry project detailing saponification—the exothermic reaction between triglycerides (olive, coconut, and castor oils) and sodium hydroxide (lye) dissolved in distilled water. The maker monitors and balances oil and lye temperatures, blends the emulsion to "trace" with an immersion blender, incorporates essential oils and botanical colorants, and pours the batter into silicone loaf molds where it hardens and neutralizes across a 4-to-6 week curing cycle.  
* **Difficulty / Time:** Beginner (requires standard safety goggles and gloves for caustic lye); roughly 1–2 hours active prep plus a 4-week cure.  
* **Tweak It:**  
  * Substitute distilled water with frozen brewed coffee or coconut milk to add natural antioxidants and yield a dense, creamy lather.  
  * Fold in fine spent espresso grounds, colloidal oatmeal, or volcanic pumice powder during the pour stage to introduce natural physical exfoliation.  
  * Formulate a 100% pure olive oil "Castile" batch to observe how curing duration directly influences bar hardness and fatty acid lather profiles.

# **3\. 3D-Printed Self-Watering Planter with Capillary Wick (Garden & Outdoor)**

* **Source:** [3D Printed Self Watering Planter — Instructables](https://www.instructables.com/3D-Printed-Self-Watering-Planter-1/)  
* **Summary:** A desktop indoor gardening solution designed and 3D printed with two interlocking PLA chambers: an inner perforated soil cup and an outer water reservoir base. Using a braided cotton or fiberglass wick threading from the bottom basin into the root zone, the planter harnesses passive capillary action to draw moisture upwards as the soil dries, preventing overwatering and keeping houseplants hydrated for up to two weeks without power or pumps.  
* **Difficulty / Time:** Beginner; roughly 30 minutes CAD modeling/slicing plus 6–8 hours 3D print time.  
* **Tweak It:**  
  * Integrate a visual water-level float indicator using a lightweight hollow cylinder and bright contrasting pin to check water depth at a glance.  
  * Print the inner liner using porous terracotta-style composite filament or porous infill walls (no top/bottom layers) for wickless natural osmotic moisture transfer.  
  * Scale down the CAD model to create a modular magnetic wall-hanging vertical herb garden for indoor kitchens.

# **4\. Mechanical Cardboard Cryptex Vault (Games & Puzzles)**

* **Source:** [Cardboard Cryptex Vault — Instructables](https://www.instructables.com/Cardboard-Cryptex-Vault/)  
* **Summary:** A working mechanical combination cipher lock inspired by Dan Brown's Da Vinci Code, built entirely from corrugated cardboard, cardstock tubes, and craft glue without wood or metal. The maker constructs nested concentric cylindrical barrels with alignment notches and a 5-letter rotating dial system, where only the correct password aligns the internal tumbler gates to release the locking drawer and access the hidden inner compartment.  
* **Difficulty / Time:** Intermediate; roughly 4–6 hours of precise measuring, scoring, and layering.  
* **Tweak It:**  
  * Replace the letter dials with binary or hexadecimal wheels to turn it into a computer science cipher challenge for campus hackathons or escape rooms.  
  * 3D print the internal tumbler rings in PLA while keeping the outer aesthetic wrapped in parchment or heavy paper to increase mechanical durability.  
  * Embed micro reed switches and a small buzzer inside the inner core so an alarm beeps if opened without entering the proper key.

# **5\. Building Interactive Terminal Dashboards with Textual & Rich (Software & Digital)**

* **Source:** [Make Your Python CLI Tools Pop With Rich — Hackaday](https://hackaday.com/2022/01/19/make-your-python-cli-tools-pop-with-rich/)  
* **Summary:** Developer Will McGugan created Rich and Textual, a Python framework that turns standard command-line environments into rich, mouse-responsive Terminal User Interfaces (TUIs) using modern ANSI escape sequences. By combining flexbox-like CSS layouts directly in the terminal, the framework enables developers to build real-time system monitors, live data dashboards, interactive data tables, and syntax-highlighted viewers with smooth 60fps terminal rendering and zero native GUI baggage.  
* **Difficulty / Time:** Easy to use; roughly 2–4 hours to prototype a custom terminal dashboard.  
* **Tweak It:**  
  * Hook Textual into psutil and local Ollama API endpoints to build a customized, brutalist hardware-monitoring dashboard for your local AI workstation.  
  * Connect it to your home IoT broker via paho-mqtt to monitor ESP32 power strip metrics and sensor telemetry directly from your terminal session.  
  * Recreate the core layout in Rust using the ratatui crate to compare binary footprint, memory consumption, and startup latency against Python.

# **September 30, 2026**

# **1\. Custom Mechanical Macropad with Animated Eyes (Hardware & Electronics)**

* **Source:** [How I Made a Macropad With Animated Eyes & Productive Keys — Instructables](https://www.instructables.com/How-I-Made-a-Macropad-With-Animated-Eyes-Productiv/)  
* **Summary:** A desktop productivity macropad built using an ultra-compact Seeed Studio XIAO ESP32-S3 microcontroller, six clicky Kailh/Gateron mechanical switches, a 0.96-inch monochrome I2C OLED display, and a two-piece 3D-printed enclosure. The XIAO ESP32-S3 acts as a native USB Human Interface Device (HID) to trigger programmable keystrokes and system shortcuts, while the OLED screen renders expressive animated pupil eyes that react dynamically to keypresses and idle states.  
* **Difficulty / Time:** Intermediate; roughly 4–6 hours across CAD modeling/3D printing, circuit wiring, and Arduino C++ firmware flashing.  
* **Tweak It:**  
  * Add a rotary encoder with a push-switch to manage system volume, scrub media timelines, or zoom IDE text.  
  * Implement Bluetooth Low Energy (BLE) HID mode on the ESP32-S3 alongside a small LiPo cell so the macropad operates wirelessly on any laptop.  
  * Build a web-based configurator app via WebHID in React/Tailwind to remap key combinations and macro strings without recompiling firmware.

# **2\. Simple Macrame Hanging Basket for Indoor Planters (Textiles & Fiber Arts)**

* **Source:** [Simple Macrame Plant Hanger — Instructables](https://www.instructables.com/Simple-Macrame-Plant-Hanger/)  
* **Summary:** A beginner-friendly fiber craft project that transforms natural cotton cord or jute twine into a hanging plant cradle through geometric knotting patterns. By dividing eight strands into pairs and sequentially tying alternating half-knots and gathering knots at measured intervals, the cords form an open hexagonal net that expands to securely cradle plant pots of various diameters.  
* **Difficulty / Time:** Beginner; roughly 1 hour of knot tying without needles or specialized tools.  
* **Tweak It:**  
  * Incorporate colorful paracord or waxed polyester cord instead of cotton to make the hanger completely weather- and rot-resistant for outdoor balcony use.  
  * Thread wooden or clay beads into the alternating knot intersections to introduce bohemian visual textures and structural weight.  
  * Scale up the geometry and strand count from four pairs to eight pairs to construct a suspended fruit hammock or multi-tier double-pot hanger.

# **3\. Cultivating a Wild Sourdough Starter from Scratch (Chemistry/Kitchen Crafts)**

* **Source:** [Grow Your Own Wild Sourdough Starter — Instructables](https://www.instructables.com/Grow-Your-Own-Wild-Sourdough-Starter/)  
* **Summary:** A biological kitchen experiment harnessing wild airborne Saccharomyces yeasts and homofermentative Lactobacillus bacteria present on raw cereal grains and kitchen air. Across a five-day feeding schedule with equal parts whole-grain flour and water (with an initial acidic fruit juice boost to suppress unwanted opportunistic bacteria), the microflora establish a self-sustaining ecosystem that vigorously metabolizes starches into lactic acid, acetic acid, and carbon dioxide bubbles.  
* **Difficulty / Time:** Beginner; \~10 minutes of active feeding per day over 5–7 days.  
* **Tweak It:**  
  * Experiment with grain varietals by feeding a parallel starter split with 100% rye flour to observe shifts in enzymatic activity, aroma acidity, and fermentation tempo.  
  * Monitor microbial vigor quantitatively by building an ESP32 optical time-lapse monitor or ultrasonic distance sensor above the jar to graph hourly dough rise curves.  
  * Dehydrate mature discard starter on parchment paper at room temperature to preserve dormant dry starter flakes as a backup shelf-stable culture.

# **4\. Linocut Relief Printmaking from Block to Paper (Paper & Print)**

* **Source:** [Making a Linocut Print From Start to Finish — Instructables](https://www.instructables.com/Making-a-Linocut-Print-From-Start-to-Finish/)  
* **Summary:** A traditional printmaking craft where an illustration is transferred in reverse onto a soft linoleum or rubber block and hand-carved using V-gouges and U-gouges to establish negative space. Oil- or water-based block printing ink is rolled out evenly with a rubber brayer onto the raised relief areas, and paper is burnished manually over the inked block using a wooden or plastic barren to pull high-contrast, graphic multi-edition art prints.  
* **Difficulty / Time:** Beginner to Intermediate (patience and careful knife safety required); \~2–4 hours.  
* **Tweak It:**  
  * Create a multi-color reduction linocut print where successive layers of color are printed from the same block by carving away further details between print runs.  
  * Swap standard paper for unbleached cotton tote bags or fabric canvas treated with textile block printing ink to produce custom wearable merchandise.  
  * Carve miniature 25mm rubber stamp blocks mounted on recycled plastic caps to print custom repetitive geometric borders or circuit-board-inspired visual motifs.

# **5\. Cardboard Tabletop Pinball Machine with Micro:bit Scoreboard (Games & Puzzles)**

* **Source:** [Cardboard Pinball Machine Using a Pizza Box, Strawbees, and a Micro:bit — Instructables](https://www.instructables.com/Cardboard-Pinball-Machine-Using-a-Pizza-Box-Strawb/)  
* **Summary:** A mechanical tabletop arcade game constructed from a recycled cardboard pizza box, drinking straws, rubber bands, and a BBC micro:bit microcontroller. Rubber-band-tensioned cardboard levers serve as manual flippers and a spring-loaded marble launcher, while conductive aluminum foil targets on bumpers complete electrical circuit loops to alligator clips, triggering score counters and sound effects on the micro:bit's 5x5 LED matrix display.  
* **Difficulty / Time:** Beginner to Intermediate; \~3–4 hours of cardboard scoring, cutting, and basic block coding.  
* **Tweak It:**  
  * Replace the foil contact pads with miniature limit switches or IR break-beam optical sensors to prevent contact bounce and register ultra-fast multi-ball hits.  
  * Add a small 5V servo motor controlled by the micro:bit to trigger motorized moving targets or popup bumpers that activate during bonus multiplier rounds.  
  * Connect an addressable WS2812 NeoPixel strip along the inner perimeter of the cardboard alley to flash colorful victory animations when high scores are achieved.

# **October 3, 2026**

# **1\. Doggo: Modern Command-Line DNS Client for Humans (Software & Digital)**

* **Source:** [Doggo: Command-line DNS Client for Humans — GitHub](https://github.com/mr-karan/doggo)  
* **Summary:** Developer Karan Sharma created Doggo, an open-source command-line DNS client written in Go designed as a human-friendly alternative to legacy tools like dig. It features colorful, structured terminal output tables with query latency, supports modern encrypted transport protocols including DNS-over-HTTPS (DoH), DNS-over-TLS (DoT), and DNSCrypt, and provides native JSON and ndjson output flags for seamless shell pipeline scripting.  
* **Difficulty / Time:** Beginner to Intermediate; roughly 1–2 hours to explore, compile, and configure custom shell aliases.  
* **Tweak It:**  
  * Wrap Doggo into a Raycast or Alfred desktop workflow to execute instant keyboard-shortcut DNS inspections with inline latency badges.  
  * Implement an automated monitoring shell daemon that runs Doggo queries every 5 minutes across multiple public resolvers (Cloudflare, Quad9, Google) and logs DNS propagation delays to SQLite.  
  * Rewrite a lightweight single-binary web frontend using Go's net/http and htmx to provide a self-hosted web-based DNS lookup tool on your local network.

# **2\. The Ubiquitous Atari Punk Console Sound Synthesizer (Music & Performance-Adjacent)**

* **Source:** [The Ubiquitous Atari Punk Console — Hackaday](https://hackaday.com/2015/09/17/the-ubiquitous-atari-punk-console/)  
* **Summary:** A classic analog noise synthesizer circuit originally engineered by Forrest Mims as a stepped tone generator and popularized as the Atari Punk Console (APC). Built around two 555 timers (or a single 556 dual timer IC), the first timer acts as an astable multivibrator setting the frequency, while the second acts as a monostable multivibrator shaping pulse width. Modulating the dual potentiometers produces lo-fi, glitchy, square-wave chiptune tones reminiscent of early 8-bit arcade machines.  
* **Difficulty / Time:** Beginner; roughly 1–2 hours on a solderless breadboard or stripboard.  
* **Tweak It:**  
  * Replace the potentiometers with light-dependent photoresistors (LDRs) to play the synth optically by waving your hands over light sources like a low-cost optical theremin.  
  * Add a low-frequency oscillator (LFO) sub-circuit to continuously modulate the pitch or pulse width for automated wobbling drones and siren sweeps.  
  * Feed an external trigger clock signal from a sequencer or Arduino GPIO pin into pin 4 to sync the stepped tone bursts to musical tempos.

# **3\. Passive Kratky Method Hydroponic Container Garden (Garden & Outdoor)**

* **Source:** [Kratky Method Hydroponics Tutorial — Instructables](https://www.instructables.com/Kratky-Method-Hydroponics-Tutorial/)  
* **Summary:** A non-circulating passive hydroponics build that grows leafy greens (like lettuce, spinach, and basil) in recycled food-grade plastic containers without electric pumps, air stones, or plumbing. Seedlings are placed in plastic net cups filled with expanded clay pebbles resting in holes cut into the container lid. As the plant absorbs the nutrient-rich water solution, the water level recedes naturally, creating an expanding humid "air zone" that allows the upper roots to absorb oxygen while lower roots absorb water and minerals until harvest.  
* **Difficulty / Time:** Beginner; roughly 30–45 minutes of container prep and nutrient mixing.  
* **Tweak It:**  
  * Wrap or spray-paint the exterior of transparent plastic reservoirs in opaque black followed by white to prevent light penetration, stopping algae blooms while reflecting ambient heat.  
  * Fit an external clear sight-tube with a floating plastic indicator bead along the side of the container to check nutrient liquid levels without lifting the lid.  
  * Build a low-cost capacitive liquid-level sensor using copper foil strips taped to the outside of the plastic container hooked to an ESP32 to send push notifications when the reservoir hits a 15% threshold.

# **4\. Japanese Boro and Sashiko Decorative Visible Mending (Textiles & Fiber Arts)**

* **Source:** [Visible Mending 101 — Instructables](https://www.instructables.com/Visible-Mending-101/)  
* **Summary:** A traditional Japanese visible mending technique that structurally reinforces torn denim, canvas, or cotton garments using layers of scrap fabric and geometric running stitches. Rather than concealing wear and tear, contrasting cotton embroidery floss is stitched in grid-aligned or freeform geometric patterns (such as seigaiha waves or asanoha hemp leaves) through the garment and backing patches, strengthening frayed edges while creating textured wearable folk art.  
* **Difficulty / Time:** Beginner; roughly 1–3 hours of hand-stitching depending on hole size.  
* **Tweak It:**  
  * Draw precision geometric stitch templates on water-soluble stabilizer sheet (Sulky Fabri-Solv) that washes away in warm water after stitching, guaranteeing perfectly uniform spacing.  
  * Use luminescent or UV-reactive neon embroidery thread so the mended denim seams glow vibrantly under blacklight at night.  
  * Stitch a hidden interior pocket behind the exterior sashiko patch on a jacket or tote bag to hold emergency transit cards or keys.

# **5\. All-Natural Beeswax and Botanical Oil Lip Balm (Chemistry/Kitchen Crafts)**

* **Source:** [Natural Lip Balm \- 5 Ingredients — Instructables](https://www.instructables.com/Natural-Lip-Balm-5-Ingredients/)  
* **Summary:** A clean cosmetic kitchen chemistry project that formulates protective lip balms by melting yellow beeswax pellets, unrefined shea butter, and virgin coconut and jojoba oils over a gentle double-boiler bath. Maintaining low heat prevents scorching delicate fatty acid chains, while blending the molten lipid base with vitamin E oil and natural peppermint essential oil preserves freshness and provides a cooling tingle before being pipetted into reusable twist-up plastic tubes to cool and solidify.  
* **Difficulty / Time:** Beginner; roughly 30 minutes active prep plus 30 minutes cooling.  
* **Tweak It:**  
  * Infuse the liquid carrier oils beforehand with dried calendula petals, chamomile, or alkanet root over low heat to naturally impart botanical healing properties and a subtle rose-tinted hue.  
  * Adjust the ratio of hard beeswax to soft liquid oils (e.g. 1:1:1 vs 1:2:1) to customize the firmness between a stiff, weather-resistant outdoor wind balm and a soft, glossy everyday moisturizer.  
  * Swap peppermint oil for therapeutic-grade sweet orange and cardamom essential oils for a warm, spiced citrus flavor profile.

# **October 5, 2026**

# **1\. Paint Pulse: Suminagashi Japanese Water Marbling (Paper & Print)**

* **Source:** [Paint Pulse: Digital Water Marbling — Instructables](https://www.instructables.com/Paint-Pulse-Digital-Water-Marbling/)  
* **Summary:** A traditional Japanese paper marbling technique where non-toxic suminagashi inks are floated drop by drop on the surface of calm water to create concentric floating ink rings. By gently manipulating the surface tension with a brush, air currents, or a stylus, organic undulating patterns form, which are then permanently captured by laying a sheet of unryu or watercolor paper flat onto the water's surface to absorb the floating pigment.  
* **Difficulty / Time:** Beginner; roughly 1 hour of setup and experimentation.  
* **Tweak It:**  
  * Use a gentle battery-operated mini USB desk fan or a drinking straw to blow precise aerodynamic ripples across the ink bath before dipping.  
  * Dip hand-folded origami sheets into the marbling bath to create intricate symmetry lines that appear only when unfolded.  
  * Add a drop of mild dish detergent or surfactant to the center of an ink ring to trigger an instantaneous burst expanding all patterns toward the tray edges.

# **2\. ESP32 Weather Station with Six-Color E-Paper Display (Hardware & Electronics)**

* **Source:** [ESP32 Weather Station Looks Great With Color E-Paper Display — Hackaday](https://hackaday.com/2024/02/28/esp32-weather-station-looks-great-with-color-e-paper-display/)  
* **Summary:** Maker educ8s.tv built an ultra-low-power ambient desktop weather monitor driven by an ESP32 microcontroller, a BMP180 barometric sensor, a DHT22 temperature/humidity probe, and a vivid six-color electronic paper display. The system wakes periodically from deep sleep, polls sensor readings, computes a local barometric weather forecast using the classic Zambretti algorithm, renders data graphs, and returns to sleep, enabling months of continuous operation on a single rechargeable battery.  
* **Difficulty / Time:** Intermediate; roughly 4–6 hours of circuit wiring, 3D printing an enclosure, and Arduino/ESP-IDF coding.  
* **Tweak It:**  
  * Pull hyper-local weather alerts and rain radar estimates via Wi-Fi from the Open-Meteo REST API to complement the onboard barometric calculations.  
  * Add an indoor air quality VOC/CO2 sensor (like an SGP30 or SCD40) to display ventilation status warnings directly on the e-paper panel.  
  * Power the unit with a small 5V solar cell and a TP4056 LiPo charging module to create a fully autonomous off-grid windowsill monitor.

# **3\. Optical Theremin Using Dual Gesture Sensors (Music & Performance-Adjacent)**

* **Source:** [Optical Theremin Makes Eerie Audio With Few Parts — Hackaday](https://hackaday.com/2021/09/19/optical-theremin-makes-eerie-audio-with-few-parts/)  
* **Summary:** Maker Fearless Night designed an optical electronic instrument inspired by the classic theremin, replacing delicate capacitive RF antennas with two Avago APDS-9960 optical gesture and proximity sensors wired to an STM32 "Blue Pill" microcontroller. By moving hands closer or farther from the optical sensors, the MCU dynamically maps optical reflection distances to audio pitch and volume, generating eerie, continuous glissando soundscapes via Direct Digital Synthesis (DDS) through a low-pass audio filter.  
* **Difficulty / Time:** Intermediate; roughly 3–5 hours across circuit assembly, optical calibration, and 3D printing a housing.  
* **Tweak It:**  
  * Swap the STM32 for a Raspberry Pi Pico or ESP32 and send pitch/expression values as standard MIDI CC messages over USB to control software VSTs in your DAW.  
  * Add RGB NeoPixels beneath the optical sensors that shift color temperature dynamically from cool blue to warm amber to visually display octave pitch height.  
  * Program quantized musical scale modes (pentatonic, blues, Dorian) into the firmware to eliminate dissonant tones for easier melodic playing.

# **4\. Stackable Plastic Tote Worm Condo Composter (Garden & Outdoor)**

* **Source:** [Worm Condo Composter — Instructables](https://www.instructables.com/Worm-Condo-Composter/)  
* **Summary:** A compact vermicomposting system built by nesting three opaque plastic storage totes fitted with drilled aeration and drainage holes. Kitchen vegetable scraps and shredded newspaper bedding are placed in the upper bins where red wiggler composting worms (Eisenia fetida) process organic waste into nutrient-dense vermicompost castings, while the untouched bottom tote catches excess liquid "worm tea" to dilute into liquid fertilizer for garden plants.  
* **Difficulty / Time:** Beginner; roughly 1–2 hours of measuring, drilling, and bin prep.  
* **Tweak It:**  
  * Install a brass or plastic spigot with a gasket near the bottom of the lowest reservoir bin to drain liquid fertilizer without lifting the heavy stacked worm trays.  
  * Line ventilation holes with fine stainless steel or nylon mesh to prevent fruit flies while preserving optimal oxygen airflow for the worms.  
  * Insert a digital soil temperature and moisture probe into the working tray to ensure conditions remain within the worms' ideal 15°C–25°C activity window.

# **5\. Super Low-Tech Playable Cardboard Platformer (Games & Puzzles)**

* **Source:** [Super Low Tech Mario — Hackaday](https://hackaday.com/2017/11/16/super-low-tech-mario/)  
* **Summary:** A mechanical tabletop gaming console constructed from corrugated cardboard boxes, hot glue, DC toy motors, small neodymium magnets, and a ball bearing. Players turn a manual wired remote-control crank to scroll a looping paper track of obstacles past an upright cardboard character attached to a magnet; guiding the character to jump over spinning hazards and pits triggers a mechanical lever that displays a physical "Game Over" pop-up screen if hit.  
* **Difficulty / Time:** Intermediate; roughly 4–6 hours of cardboard cutting, linkage fitting, and mechanical tuning.  
* **Tweak It:**  
  * Replace the manual motor switch with an Arduino-driven servo and foot pedal to test rhythm and jump timing with varying obstacle speeds.  
  * Design swappable paper scroll cartridges so players can draw, color, and load their own custom platformer levels.  
  * Add micro limit switches along the obstacle track connected to a piezo buzzer to play authentic 8-bit sound effects when jumps or collisions occur.

# **October 6, 2026**

# **1\. Eye-D Badge: Interactive BLE RGB Matrix Conference Badge (Hardware & Electronics)**

* **Source:** [Eye-D Badge Catches Your Attention — Hackaday](https://hackaday.com/2026/09/17/eye-d-badge-catches-your-attention/)  
* **Summary:** Maker Aahan designed an interactive electronic conference badge built around an ESP32-C6 microcontroller paired with an 8x16 matrix of WS2812B addressable RGB LEDs (128 pixels total). Using the ESP32-C6's built-in Bluetooth Low Energy (BLE) radio, users can wirelessly update scrolling text, display custom pixel art in real time via a web interface, or trigger animations like wandering pupils and Matrix rain. The board, battery, and optics are housed inside a compact, 3D-printed lanyard-ready enclosure.  
* **Difficulty / Time:** Intermediate; roughly 4–6 hours of 3D printing, circuit soldering, and ESP-IDF/Arduino BLE firmware setup.  
* **Tweak It:**  
  * Add an onboard micro vibration motor and capacitive touch pads to buzz subtle haptic alerts when nearby badges with matching BLE advertisement UUIDs are detected.  
  * Incorporate a small LiPo fuel-gauge IC (like the MAX17048) over I2C to display an animated battery level icon directly on the pixel matrix.  
  * Recompile the web companion app as a Progressive Web App (PWA) with Web Bluetooth API support for zero-install control straight from Safari or Chrome.

# **2\. Textured Punch Needle Embroidery Wall Hanging (Textiles & Fiber Arts)**

* **Source:** [Discover Punch Needle: Significant Otter Design — Instructables](https://www.instructables.com/Discover-Punch-Needle-Significant-Otter-Design/)  
* **Summary:** A tactile fiber art project where monks cloth or dense unbleached cotton is stretched drum-tight across an embroidery hoop and punched using an adjustable hollow punch needle tool threaded with embroidery floss. Working from the back creates a dense bed of raised yarn loops on the front side while flat contour running stitches define sharp graphic outlines, yielding a textured, plush decorative textile patch without knotting.  
* **Difficulty / Time:** Beginner; roughly 2–3 hours of punching and contouring.  
* **Tweak It:**  
  * Apply liquid latex or flexible textile fabric glue to the reverse side to permanently lock the loops in place so the piece can be cut out as a plush sew-on garment patch.  
  * Combine varying yarn thicknesses (chunky wool yarn alongside fine cotton embroidery floss) by swapping punch needle gauge tips to create dimensional multi-depth topography.  
  * Back the finished textile circle with a layer of cork or felt to convert the embroidery into an absorbent, heat-resistant table trivet or drink coaster.

# **3\. MicroBin: Lightweight Self-Hosted Pastebin & File Sharing (Software & Digital)**

* **Source:** [MicroBin: Self-Hosted Pastebin and URL Shortener — GitHub](https://github.com/szabodanika/microbin)  
* **Summary:** Developer Daniel Szabo built MicroBin, a self-contained, lightweight pastebin and encrypted file-sharing web application written in Rust using Axum and SQLite. Compiled as a single tiny executable that consumes under 15MB of RAM, it supports client-side AES encryption, syntax highlighting for dozens of programming languages, QR code sharing, burn-after-reading pastes, and expiring URLs without requiring heavy external databases.  
* **Difficulty / Time:** Easy to deploy; roughly 1–2 hours to set up on a home server or VPS.  
* **Tweak It:**  
  * Deploy MicroBin inside a lightweight Docker container behind a Caddy reverse proxy on a home server, auto-generating HTTPS certificates for secure local network snippet sharing.  
  * Write a custom bash or PowerShell CLI wrapper script using curl that reads from standard input to instantly upload terminal logs and copy the shortlink to your system clipboard.  
  * Extend the web frontend with a custom brutalist CSS theme featuring high-contrast monospace typography and instant keyboard shortcuts for quick snippet creation.

# **4\. Bag Lacto-Fermentation for Clean Sauerkraut and Kimchi (Chemistry/Kitchen Crafts)**

* **Source:** [Easy Homemade Sauerkraut and Kimchi Recipe in a Bag — Instructables](https://www.instructables.com/Easy-Homemade-Sauerkraut-and-Kimchi-Recipe/)  
* **Summary:** A modern food biotechnology technique that ferments shredded cabbage, carrots, and aromatics inside heat-sealed food-grade vacuum pouches using exact 2.5% salinity by weight. By vacuum-sealing the salted vegetables, oxygen is completely evacuated from the environment, creating ideal anaerobic conditions for beneficial Leuconostoc and Lactobacillus bacteria to thrive while completely preventing surface mold growth, evaporation, and odors throughout a 4-to-6 week ambient room-temperature fermentation.  
* **Difficulty / Time:** Beginner; roughly 30 minutes of vegetable prep and vacuum sealing plus 4 weeks of passive fermentation.  
* **Tweak It:**  
  * Add sliced habaneros, garlic cloves, and a dash of ground turmeric to create a spicy, vibrant yellow curtido-style ferment for tacos and bowls.  
  * Monitor fermentation progress non-destructively by observing pouch inflation as CO2 builds up, snipping a tiny corner to test pH with litmus strips before resealing with an impulse sealer.  
  * Substitute cabbage with thinly sliced crisp radishes or mustard greens to explore how glucosinolates alter fermentation pungency and acidity curves.

# **5\. Acoustic PVC Pan Flute Tuned to Minor Pentatonic (Music & Performance-Adjacent)**

* **Source:** [PVC Pan Flute — Instructables](https://www.instructables.com/PVC-Pan-Flute-1/)  
* **Summary:** A DIY acoustic wind instrument constructed by cutting, tuning, and binding graduated lengths of standard Schedule 40 PVC conduit pipe. Each pipe is stopped at the base with rubber corks and tuned precisely to specific musical pitches (such as an E minor scale) using a guitar tuner app while trimming millimeter by millimeter, with smoothed beveled mouthpieces for clean embouchure and clear resonant pipe acoustics.  
* **Difficulty / Time:** Beginner; roughly 2–3 hours of pipe cutting, fine sanding, and cork seating.  
* **Tweak It:**  
  * Use adjustable threaded PVC end caps or sliding wooden dowel plungers instead of fixed corks to create a tunable pan flute that can be recalibrated across different musical keys.  
  * Mount miniature electret microphone capsules inside the base of each pipe connected to an audio jack to build an amplified electro-acoustic wind instrument.  
  * Wrap the joined pipe assembly in colorful leather cords or woven macrame banding to provide structural rigidity and a comfortable ergonomic handgrip while playing.

# **October 7, 2026**

# **1\. Miniature Japanese Stab-Bound Journal (Paper & Print)**

* **Source:** [Miniature Japanese Stab Bound Book — Instructables](https://www.instructables.com/Miniature-Japanese-Stab-Bound-Book-Mini-Bookbindin/)  
* **Summary:** A traditional bookbinding craft project that constructs a pocket notebook using the historical Japanese four-hole stab binding technique (Yotsume Toji). Single sheets of heavy stock or handmade paper are stacked flush with decorative cardstock covers, clamped, and punched with an awl through four measured binding stations along the spine edge. Waxed linen bookbinding thread is stitched through the stations in interlocking loops around both the top and long edges of the book block, creating a durable, elegant exposed thread pattern without glue.  
* **Difficulty / Time:** Beginner; roughly 1–2 hours.  
* **Tweak It:**  
  * Upgrade the basic four-hole pattern to more complex historical Japanese stab binding variants like the Tortoise Shell (Kikko Toji) or Noble stitch (Koki Toji) for decorative geometric flair.  
  * Use alternating signatures of dotted grid paper and heavy watercolor paper to make a modular mixed-media field notebook.  
  * Incorporate a stiff bookmark ribbon anchored through the first station loop with a miniature charm dangling at the tail.

# **2\. Custom 3D-Printed Marble Maze Game (Games & Puzzles)**

* **Source:** [DIY MARBLE MAZE GAME — Instructables](https://www.instructables.com/DIY-MARBLE-MAZE-GAME/)  
* **Summary:** A desktop tilt maze game designed in Autodesk Fusion 360 and fabricated on a standard FDM 3D printer using PLA filament. The maker models intricate walled path labyrinths with deceptive dead ends, trap holes, and ramped exit ports, then exports the geometry as an STL file sliced with tight perimeters for smooth marble rolling without snags.  
* **Difficulty / Time:** Beginner to Intermediate; roughly 1–2 hours of CAD modeling plus 4–6 hours print time.  
* **Tweak It:**  
  * Mount the maze inside a two-axis gimbal ring powered by dual SG90 micro servos and an analog thumb joystick so players guide the marble electronically.  
  * Add snap-together modular maze floor tiles with magnetic bases so the labyrinth layout can be reconfigured dynamically for new challenges.  
  * Embed micro reed switches beneath key trap holes so a fallen magnetic ball bearing triggers an LED or buzzer when lost.

# **3\. A Pi Pico Pocket Oscilloscope (Hardware & Electronics)**

* **Source:** [A Pi Pico Oscilloscope — Hackaday](https://hackaday.com/2022/11/06/a-pi-pico-oscilloscope/)  
* **Summary:** A portable DIY digital oscilloscope built around a Raspberry Pi Pico (RP2040) utilizing its onboard 12-bit ADC and dual 133MHz ARM Cortex-M0+ cores. Using custom firmware written in C/C++, the RP2040 samples input waveforms at up to 500k samples per second, driving an attached SPI color TFT display with real-time waveform tracing, voltage measurements, frequency counters, and trigger controls.  
* **Difficulty / Time:** Intermediate; roughly 3–5 hours across breadboard wiring, firmware flashing, and 3D printing a pocket enclosure.  
* **Tweak It:**  
  * Add an input buffer op-amp circuit (like a rail-to-rail TLV2372) with switchable 1x/10x voltage divider attenuation to safely measure voltages up to 30V without damaging the 3.3V ADC.  
  * Implement a rotary encoder to dynamically scrub timebase divisions (μs/div to ms/div) and voltage scales directly without clunky pushbuttons.  
  * Add Bluetooth (using a Pico W) or USB serial streaming to pipe raw ADC capture buffers into a web browser dashboard via the Web Serial API for large-screen viewing.

# **4\. strace-tui: Interactive Terminal Interface for Linux System Calls (Software & Digital)**

* **Source:** [Linux Fu: Taming Strace — Hackaday](https://hackaday.com/2026/06/02/linux-fu-taming-strace/)  
* **Summary:** Developer Rodrigodd created strace-tui, an open-source terminal user interface written in Rust that tames the massive text streams generated by the Linux strace diagnostic tool. It captures or parses system call traces, organizing thousands of syscall events into collapsible tree views, process filters, execution timing breakdowns, and error highlights inside an interactive keyboard-navigable TUI powered by Ratatui.  
* **Difficulty / Time:** Beginner to Intermediate; roughly 1 hour to install with Cargo and configure shell aliases.  
* **Tweak It:**  
  * Pipe strace output from Docker container runtimes into strace-tui to visually inspect container sandbox violations and permission drops in development environments.  
  * Add custom color-coded alerting rules in Rust to highlight slow I/O calls (e.g. epoll\_wait or read taking over 100ms) with red status badges.  
  * Build an export feature that dumps filtered system call profiles into flame graphs or JSON summaries for performance benchmarking pipelines.

# **5\. Hand-Rolled Honeycomb Beeswax Candles (Chemistry/Kitchen Crafts)**

* **Source:** [Beeswax Sushi Candles — Instructables](https://www.instructables.com/Beeswax-Sushi-Candles/)  
* **Summary:** A traditional zero-melting candle craft using natural textured honeycomb beeswax foundation sheets and square-braided cotton wicking. By slightly warming the beeswax sheets with a hairdryer to make the natural wax pliable without melting it, the maker tightly rolls the sheets around a primed wick, creating clean-burning, non-toxic pillar and novelty candles that emit a natural subtle honey aroma with zero soot or paraffin petroleum chemicals.  
* **Difficulty / Time:** Beginner; roughly 30 minutes of measuring, cutting, and rolling.  
* **Tweak It:**  
  * Layer alternating contrasting colored beeswax sheets (e.g. natural golden honey and forest green) to reveal spiraled two-tone decorative cores when burned.  
  * Dust the inner edge with ground cinnamon, dried crushed lavender, or powdered clove before rolling so gentle botanicals infuse the room as the wax pool warms.  
  * Roll conical tapered candles by cutting the beeswax sheet along an angled diagonal line prior to rolling, producing elegant spiral tapers for candlesticks.

# **October 8, 2026**

# **1\. Single Bucket Sub-Irrigated Planter (Garden & Outdoor)**

* **Source:** [Single Bucket Sub-Irrigated Planter — Instructables](https://www.instructables.com/Single-Bucket-Sub-Irrigated-Planter/)  
* **Summary:** Maker transformed a standard 5-gallon food-grade plastic bucket into an efficient, self-watering sub-irrigated planter (SIP). A section of 4-inch perforated corrugated drain pipe sits at the base wrapped in mesh to create a 1.5-gallon water reservoir, with a vertical 3/4-inch PVC fill pipe and a small drilled overflow weep hole to prevent over-saturation. Loose potting mix packed into the pipe grooves creates a natural wicking chamber that draws water upward to plant root zones by capillary action for days without surface watering.  
* **Difficulty / Time:** Beginner; roughly 1 hour of measuring, drilling, and pipe fitting.  
* **Tweak It:**  
  * Add a float indicator using a wooden skewer or plastic drinking straw inside the PVC pipe with a cork at the bottom to check water depth at a glance.  
  * Drill a series of 1/4-inch side holes near the bottom and insert a drip-tape connector to chain multiple bucket planters to a single gravity-fed rain barrel reservoir.  
  * Wrap the exterior of dark buckets in white vinyl or foil insulation to keep the soil and water reservoir cool in high summer heat.

# **2\. Easy Paracord Drawstring Pouch (Textiles & Fiber Arts)**

* **Source:** [Easy Paracord Drawstring Pouch — Instructables](https://www.instructables.com/Easy-Paracord-Drawstring-Pouch/)  
* **Summary:** A rugged, pliable gear pouch constructed by hand-weaving continuous lengths of 550 military-spec nylon paracord using an interlocking loop technique. By weaving rows of alternating half-hitches around a cylindrical form and closing the bottom seam with a gathering knot, the maker forms a resilient, flexible drawstring bag equipped with a cord-lock closure to organize pocket tools, chargers, or camping gear.  
* **Difficulty / Time:** Beginner; roughly 1.5–2 hours of rhythmic hand-weaving without needles.  
* **Tweak It:**  
  * Weave in a high-visibility reflective tracer paracord or glow-in-the-dark cord so the pouch can be located instantly inside a backpack in low light.  
  * Integrate an internal ripstop nylon liner to prevent small items like memory cards or coins from slipping between the cord weave gaps.  
  * Add a small plastic swivel snap hook to the drawstring collar to easily clip the pouch to belt loops or backpack webbing.

# **3\. Building a Six-Channel Floppy Drive Synth (Music & Performance-Adjacent)**

* **Source:** [Building A Six-Channel Floppy Drive Synth — Hackaday](https://hackaday.com/2013/02/13/building-a-six-channel-floppy-drive-synth-from-start-to-finish/)  
* **Summary:** Maker Rupert engineered an Arduino-driven musical instrument that repurposes the stepper motors from six vintage 3.5-inch floppy disk drives into an electro-mechanical musical ensemble. An Arduino microcontroller receives standard multi-track MIDI input streams over USB and converts note pitches into precise frequency step pulses sent to drive control pins, making the internal read/write magnetic head actuators vibrate the drive chassis to produce distinctive buzzy polyphonic tones.  
* **Difficulty / Time:** Intermediate; roughly 6–8 hours across wiring, drive power distribution, and Moppy firmware configuration.  
* **Tweak It:**  
  * Swap the Arduino for an ESP32 or Raspberry Pi Pico to support direct wireless Web MIDI or Bluetooth MIDI input from your DAW or phone.  
  * Add 3D-printed acoustic resonance cones over the floppy drive head armatures to amplify volume and enhance bass harmonics naturally without speakers.  
  * Integrate addressable WS2812 RGB LEDs inside each floppy drive bay that illuminate in sync with note velocity and frequency.

# **4\. ntfy: Lightweight HTTP-Based Pub-Sub Push Notifications (Software & Digital)**

* **Source:** [ntfy: Send Push Notifications via PUT/POST — GitHub](https://github.com/binwiederhier/ntfy)  
* **Summary:** Developer Philipp Heckel created ntfy, an open-source, self-hosted push notification platform that allows sending instant notifications to smartphones or desktops using simple HTTP PUT or POST requests. Built in Go, it features zero-configuration topic subscriptions via web, Android, and iOS apps, enabling developers to trigger instant alerts from shell scripts, cron jobs, or home automation webhooks with a single curl command.  
* **Difficulty / Time:** Easy to deploy, beginner-friendly; roughly 30 minutes to spin up via Docker.  
* **Tweak It:**  
  * Hook ntfy into your local server backup scripts with priority tags and click action URLs for instant mobile status alerts.  
  * Add actionable notification buttons in your payload that allow you to reboot a server, trigger an SSH script, or dismiss alerts directly from your phone's lock screen.  
  * Integrate ntfy with Home Assistant or an ESP32 soil moisture sensor to receive push notifications with custom icons when indoor plants need watering.

# **5\. DIY Concentric Cardstock Cipher Disk (Games & Puzzles)**

* **Source:** [Make Your Own Cipher Disk — Instructables](https://www.instructables.com/Make-Your-Own-Cipher-Disk/)  
* **Summary:** A tactile cryptographic puzzle device crafted from concentric rings of heavy cardstock paper fastened at the center with a brass split-pin brad. Each concentric ring is inscribed with the alphabet and numerical offsets, allowing players to rotate the inner disk by a designated shift key (such as Caesar, Vigenère, or ROT13 ciphers) to quickly encrypt and decode secret messages for escape room puzzles or tabletop role-playing games.  
* **Difficulty / Time:** Beginner; roughly 30–45 minutes of cutting, lettering, and assembly.  
* **Tweak It:**  
  * Replace standard letters on the inner wheel with custom fantasy runes, alchemical symbols, or binary ASCII codes to build a multi-stage escape room puzzle.  
  * Add a third concentric outer ring with numbers 0–9 and punctuation symbols to encode complex alpha-numeric passwords or GPS coordinates.  
  * 3D print the nested disks in PLA with raised tactile lettering so sight-impaired players can decode messages by touch.

# **October 9, 2026**

# **1\. LED Matrix Digital Hourglass with Accelerometer Gravity (Hardware & Electronics)**

* **Source:** [LED Matrix Hourglass Knows Which Way Is Up — Hackaday](https://hackaday.com/2021/10/08/led-matrix-hourglass-knows-which-way-is-up/)  
* **Summary:** Maker built a digital desktop hourglass using two 8x8 LED dot matrices mounted corner-to-corner inside a 3D-printed enclosure, powered by an Arduino Nano and an ADXL335/MPU6050 three-axis accelerometer. The microcontroller runs real-time cellular automata physics that simulate individual grains of glowing sand tumbling through the narrow waist bottleneck, dynamically reacting to tilts, turns, and being flipped completely upside down.  
* **Difficulty / Time:** Intermediate; roughly 4–6 hours across 3D printing, matrix wiring, and Arduino physics coding.  
* **Tweak It:**  
  * Add a micro piezo buzzer to emit subtle granular audio clicks every time a falling pixel hits the bottom chamber heap.  
  * Incorporate a rotary potentiometer or capacitive touch slider on the casing to dynamically adjust timer duration from 1 minute to 60 minutes.  
  * Add color-shifting gradients (from golden yellow to deep red) as the remaining sand in the top chamber runs low to create visual urgency.

# **2\. How to Make Handmade Paper from Recycled Fibers (Paper & Print)**

* **Source:** [How to Make Handmade Paper — Instructables](https://www.instructables.com/How-to-Make-Handmade-Paper/)  
* **Summary:** An accessible papermaking craft where shredded scrap paper, mail, and cotton offcuts are blended with warm water in a kitchen blender to create a fine cellulose pulp slurry. The pulp is dispersed in a wide basin, scooped up using a mesh mould and deckle screen to form a uniform sheet, couched onto damp absorbent wool felt, sponge-pressed to extract excess water, and air-dried into textured artisanal paper.  
* **Difficulty / Time:** Beginner; roughly 1.5–2 hours of pulping and sheet pulling plus 24 hours dry time.  
* **Tweak It:**  
  * Blend in dried whole flower petals, lavender buds, or tea leaves into the slurry right before pulling for botanical inclusions.  
  * Embed wildflower or culinary herb seeds into the wet pulp layer to create plantable seed paper gift cards that sprout in soil.  
  * Mix in unraveled colored thread scraps or gold mica powder to produce deckled luxury stationery sheets.

# **3\. Sculptural Needle-Felted Wool Figurines (Textiles & Fiber Arts)**

* **Source:** [Needle Felted Owls — Instructables](https://www.instructables.com/Needle-Felted-Owls/)  
* **Summary:** A tactile sculpting craft where carded wool roving fibers are shaped and compacted into firm, dimensional three-dimensional forms using barbed felting needles jabbed repeatedly into a high-density foam work pad. The microscopic directional scales on raw wool fibers catch on the needle barbs and tangle together, transforming loose fluffy roving into rigid, seamless felted animal shapes without sewing, internal wire armatures, or glue.  
* **Difficulty / Time:** Beginner; roughly 1.5–2.5 hours of rhythmic stabbing and shaping.  
* **Tweak It:**  
  * Insert a flexible aluminum armature wire core inside the core wool before felting to allow dynamic posable limbs and wings.  
  * Blend two contrasting shades of wool roving between your fingers prior to felting to create subtle fur-like heathered color transitions.  
  * Felt small high-strength neodymium magnets directly inside the back of the figurine so it doubles as a sculptural magnetic notice-board clip.

# **4\. Automated Bucket Aeroponics System with Humidity Cycling (Garden & Outdoor)**

* **Source:** [Aeroponics With Raspberry Pi and Humidity Sensor — Instructables](https://www.instructables.com/Aeroponics/)  
* **Summary:** A soil-free, high-efficiency plant propagation cloner built inside a standard 5-gallon opaque plastic bucket with five net cups set into the lid. Suspended above an internal water-and-nutrient reservoir, an ultrasonic mist maker or high-pressure micro fogger atomizes nutrient solution directly onto the bare suspended root zone, regulated by a microcontroller relay that pulses mist on a strict 15-second on / 5-minute off cycle for maximum root oxygenation.  
* **Difficulty / Time:** Intermediate; roughly 3–4 hours of bucket drilling, fogger wiring, and timer setup.  
* **Tweak It:**  
  * Replace the ultrasonic fogger with a 12V diaphragm pump and 360-degree misting spray nozzles to prevent nutrient salt crusting on ultrasonic ceramic discs.  
  * Add a DHT22 temperature/humidity sensor and an ESP32 to monitor root chamber vapor saturation and adjust pulse intervals dynamically based on ambient heat.  
  * Run the pump cycle off a small 12V LiFePO4 battery paired with a 20W balcony solar panel for completely off-grid indoor/patio operation.

# **5\. Biodegradable Casein Milk Plastic from Kitchen Scraps (Chemistry/Kitchen Crafts)**

* **Source:** [Plastic Milk — Instructables](https://www.instructables.com/Plastic-Milk/)  
* **Summary:** A classic kitchen polymer chemistry demonstration where warm whole milk is heated to around 50°C and mixed with white distilled vinegar (acetic acid) to drop the pH to casein's isoelectric point (pH \~4.6). This causes the milk's casein protein chains to denature and coagulate out of suspension as rubbery curds; once strained through cheesecloth and kneaded into a smooth dough, the biopolymer can be pressed into silicone cookie molds and left to dehydrate over 48 hours into rock-hard, biodegradable plastic.  
* **Difficulty / Time:** Beginner; roughly 45 minutes active prep plus 48 hours curing.  
* **Tweak It:**  
  * Add liquid food coloring, spirulina powder, or beet powder during the warm curd kneading stage to dye the bioplastic vibrant organic colors.  
  * Soak the cured, dried pieces in a mild 5% alum or vinegar bath to test tensile firmness and water resistance.  
  * Press the warm curd dough into custom silicone button molds and drill twin stitching holes while soft to craft custom garment buttons.

# **October 10, 2026**

# **1\. croc: Secure and Seamless CLI File Transfer (Software & Digital)**

* **Source:** [croc: Easily and Securely Send Files Between Computers — GitHub](https://github.com/schollz/croc)  
* **Summary:** Developer Zack Scholl built croc, an open-source command-line tool written in Go that enables encrypted peer-to-peer file and folder transfers between any two computers across local networks or the internet. It establishes an end-to-end PAKE-encrypted relay connection using short, human-memorable code phrases (e.g. croc send file.zip generates a phrase like 7-orbit-velvet for the receiver to type), bypassing complex firewall configurations and NAT punch-through issues without third-party cloud storage.  
* **Difficulty / Time:** Beginner; roughly 15–30 minutes to install and configure aliases.  
* **Tweak It:**  
  * Self-host your own dedicated relay signaling server on a private VPS or Raspberry Pi (croc relay) to maintain complete sovereignty over transmission metadata.  
  * Build an automated watch-folder daemon in Bash or Python that triggers a croc send command whenever a new render or build artifact appears in an output directory.  
  * Wrap croc's core Go library into a desktop system tray applet or menu bar utility to enable drag-and-drop file transfers with auto-generated QR codes.

# **2\. A Simple Laser Harp MIDI Instrument (Music & Performance-Adjacent)**

* **Source:** [A Simple Laser Harp MIDI Instrument — Hackaday](https://hackaday.com/2024/06/19/a-simple-laser-harp-midi-instrument/)  
* **Summary:** Maker built a playable optical instrument inspired by Jean-Michel Jarre's famous stage gear, mounting a series of red laser diode modules along a custom 3D-printed beam frame aimed directly at matched photoresistors (LDRs). An Arduino microcontroller polls the photoresistor analog voltage drops; when a musician's hand breaks a laser beam, the microcontroller generates a low-latency MIDI Note-On message over USB to trigger synth patches, samplers, or sound fonts inside a digital audio workstation (DAW).  
* **Difficulty / Time:** Intermediate; roughly 3–5 hours across frame assembly, sensor wiring, and Arduino MIDI firmware calibration.  
* **Tweak It:**  
  * Swap the fixed multi-laser diode array for a single high-power laser bounced off a high-speed galvanometer stepper scanner to project a dynamic fan of virtual optical strings.  
  * Map hand height along the interrupted beam using time-of-flight laser distance sensors (VL53L0X) to send continuous MIDI CC pitch bend or filter cutoff values.  
  * Add addressable RGB LED strips inside the frame base that flash in sync with played musical notes to create an immersive live performance visualizer.

# **3\. Makey Makey Cardboard Skee-Ball Arcade (Games & Puzzles)**

* **Source:** [Makey Makey Skee Ball Game — Instructables](https://www.instructables.com/Makey-Makey-Skee-Ball-Game/)  
* **Summary:** A tabletop arcade redemption game constructed entirely from recycled corrugated cardboard boxes, paper towel roll tubes, and conductive aluminum foil landing cups. When thrown marbles or ping-pong balls successfully hop the ramp and drop into a scoring cup, the ball bridges a foil switch wired to an alligator-clipped Makey Makey board, sending simulated keyboard keystrokes to a companion Scratch game that tallies arcade points and triggers sound effects in real time.  
* **Difficulty / Time:** Beginner to Intermediate; roughly 2–3 hours of cardboard scoring, cutting, and Scratch game coding.  
* **Tweak It:**  
  * Replace the Makey Makey with a Raspberry Pi Pico configured as a USB HID keyboard, running custom Python code that drives an external TM1637 4-digit 7-segment LED display.  
  * Add a mechanical return ramp lined with felt so scored balls roll smoothly back into a collection tray without spilling onto the floor.  
  * Build a miniature servo-driven ticket dispenser mechanism that dispenses physical paper tickets when players achieve target score thresholds.

# **4\. Beginner Amigurumi Crochet Character (Textiles & Fiber Arts)**

* **Source:** [Easy Amigurumi Character — Instructables](https://www.instructables.com/Easy-Amigurumi-Character/)  
* **Summary:** A foundational Japanese fiber art project that sculpts dimensional plush figurines using worsted weight acrylic yarn and a 4.0mm crochet hook. Working in continuous seamless spiral rounds initiated from an adjustable magic ring, the maker works single crochet stitches with calculated increases and decreases to shape rounded three-dimensional limbs, torso, and head before stuffing with dense polyester polyfill and hand-stitching the appendages together.  
* **Difficulty / Time:** Beginner; roughly 2–4 hours of stitching and assembly.  
* **Tweak It:**  
  * Embed miniature plastic poly-pellet bean bags inside the base of the doll before stuffing with polyfill to give the character bottom-weighted stability so it sits upright on a desk.  
  * Incorporate conductive yarn into the character's fingertips so the plush doll can interact with capacitive touchscreens.  
  * Crochet removable miniature clothing and accessories (such as a tiny hoodie, backpack, or beanie) using lighter fingering-weight yarn to practice modular wardrobe sizing.

# **5\. Gravity-Fed DIY Plastic Bottle Drip Irrigation System (Garden & Outdoor)**

* **Source:** [Make a DIY Drip Irrigation System at Home – Save Water & Grow — Instructables](https://www.instructables.com/Make-a-DIY-Drip-Irrigation-System-at-Home-Save-Wat/)  
* **Summary:** A simple, recycled irrigation system constructed by modifying a standard 1.5-liter or 2-liter plastic beverage bottle with a threaded valve inserted through a drilled bottle cap. When filled with water and inverted above a potted plant or outdoor garden bed, the adjustable valve regulates gravity flow into a slow, consistent drip (1–2 drops per second) directly over the root zone, keeping thirsty plants consistently hydrated while conserving water and preventing soil crusting.  
* **Difficulty / Time:** Beginner; roughly 20–30 minutes of measuring, drilling, and hanging.  
* **Tweak It:**  
  * Add a narrow flexible silicone aquarium tube to the valve tip with a perforated emitter stake pushed directly into the root zone to eliminate surface evaporation.  
  * Dissolve balanced water-soluble organic plant fertilizer (such as kelp extract or fish emulsion) into the bottle reservoir for continuous micro-fertigation.  
  * Invert multiple bottles connected via a central manifold into an elevated plastic jug to create a multi-plant gravity irrigation network for vacation watering.

# **October 11, 2026**

# **1\. The Ploopy Knob: Open-Source Magnetic Rotary Controller (Hardware & Electronics)**

* **Source:** [The Ploopy Knob Is An Open Source Magnetic Dial — Hackaday](https://hackaday.com/2024/09/24/the-ploopy-knob-is-an-open-source-magnetic-dial/)  
* **Summary:** Maker Colin designed the Ploopy Knob, a fully open-source, ultra-smooth desktop media and volume dial powered by a Raspberry Pi RP2040 running QMK firmware. Unlike traditional mechanical rotary encoders or potentiometers that wear down, it utilizes a 12-bit AS5600 contactless magnetic angle sensor and an ultra-wide 6705ZZ precision ball bearing inside a 3D-printed enclosure, delivering jitter-free 0.088-degree rotational resolution without mechanical friction.  
* **Difficulty / Time:** Intermediate; roughly 3–4 hours across 3D printing, circuit soldering, and QMK firmware configuration.  
* **Tweak It:**  
  * Program detent haptic emulation by adding a tiny micro solenoid or voice-coil actuator inside the base that fires tactile pulses at virtual software clicks.  
  * Configure QMK layers to scrub video timelines in DaVinci Resolve or zoom canvases in Blender when pressed down as a modifier key.  
  * Add an addressable WS2812 RGB ring underneath the dial base that illuminates progressively like a radial volume gauge.

# **2\. Analog 555-Timer Stylus Synthesizer (Music & Performance-Adjacent)**

* **Source:** [Stylus Synth Should Have Used A 555 – And Did\! — Hackaday](https://hackaday.com/2025/05/20/stylus-synth-should-have-used-a-555-and-did/)  
* **Summary:** Maker Darcy designed an analog stylus keyboard synthesizer inspired by the iconic vintage Stylophone, built around an NE555 timer IC and an exposed copper PCB trace touch strip. Touching a wired conductive metal stylus across the exposed ladder traces completes distinct resistive divider circuits that modulate the 555's astable oscillation frequency, paired with an RC transistor vibrato circuit and a push-pull transistor amplifier driving an onboard speaker.  
* **Difficulty / Time:** Beginner to Intermediate; roughly 2–3 hours of PCB soldering and trim-pot calibration.  
* **Tweak It:**  
  * Swap the static capacitor bank with a multi-position rotary switch to toggle across four full musical octaves on the fly.  
  * Add a 3.5mm line-out jack and variable low-pass filter to route the raw square-wave audio into external guitar distortion pedals or delay effects.  
  * Replace the fixed copper trace pads with conductive nickel paint or graphite pencil drawings on paper to turn sketched illustrations into playable instruments.

# **3\. Cardstock Mechanical Automata with Hand-Cranked Cams (Paper & Print)**

* **Source:** [Paper Minecraft Automata — Instructables](https://www.instructables.com/Paper-Minecraft-Automata/)  
* **Summary:** A purely mechanical desk toy crafted entirely from heavy cardstock paper, glue, and bamboo or paper dowels. The maker constructs a rigid cardboard housing containing a hand-cranked horizontal crankshaft with offset eccentric paper cams; as the crank handle rotates, the cams translate rotational kinetic energy into vertical reciprocal motion, lifting and dropping internal follower rods to animate paper characters in rhythmic undulating cycles.  
* **Difficulty / Time:** Beginner; roughly 2–3 hours of precise scoring, folding, and gluing.  
* **Tweak It:**  
  * Cut pear-shaped or snail-shaped paper cams to create asymmetric motion curves like sudden drops, pauses, or fluttering movements.  
  * Motorize the input shaft using a tiny 3V DC geared toy motor powered by a coin cell battery for continuous ambient desktop animation.  
  * Incorporate a small concealed cardstock chime or whistle that sounds on each peak cam revolution.

# **4\. 3D-Printed Centrifugal Spin Puzzle Box (Games & Puzzles)**

* **Source:** [3D Printed 'Centrifugal Puzzle Box' \- Solved With a Spin... — Instructables](https://www.instructables.com/3D-Printed-Centrifugal-Puzzle-Box-solved-with-/)  
* **Summary:** A mechanical sequential discovery puzzle box engineered with interlocking internal locking pins and fabricated on a standard 3D printer using PLA filament. In its resting state, gravity and internal channels hold two hidden sliding pins locked in place to keep the lid shut; players must discover that rapidly spinning the box like a top on a smooth table forces the locking pins outwards via centrifugal inertia, clearing the internal track and unlocking the drawer.  
* **Difficulty / Time:** Beginner to Intermediate; roughly 1 hour slicing and assembly plus 4–5 hours 3D printing.  
* **Tweak It:**  
  * Add counterweights or spring-loaded detents so the puzzle requires spinning at an exact rotational speed threshold rather than just spinning hard.  
  * Incorporate internal maze tracks on the locking pins so the box must be spun, tilted 90 degrees, and spun again in a specific two-step sequence.  
  * Print in glow-in-the-dark or color-changing thermochromic filament to reveal cryptic visual clues when warmed by the player's hands.

# **5\. Kombucha Bacterial Cellulose Bio-Leather (Chemistry/Kitchen Crafts)**

* **Source:** [Kombucha Fabric — Instructables](https://www.instructables.com/Kombucha-Fabric/)  
* **Summary:** A kitchen biotechnology and biomaterials project where a symbiotic colony of bacteria and yeast (Komagataeibacter xylinus) is cultivated in shallow food-grade plastic bins filled with sweet brewed black tea. Over three weeks, the microbes metabolize sucrose into a dense, floating mat of pure nano-cellulose fibers; once harvested, rinsed, and dried with coconut oil and vegetable glycerin conditioning, the pelt cures into a flexible, biodegradable vegan bio-leather.  
* **Difficulty / Time:** Beginner; roughly 1 hour active prep plus 3 weeks passive biological growth.  
* **Tweak It:**  
  * Dye the wet microbial cellulose mat using natural indigo, turmeric, or beet juice baths prior to drying for vibrant organic colors.  
  * Texture the wet pellicle by drying it flat against textured silicone baking mats or woven linen to imprint debossed grain patterns into the leather.  
  * Cut and hand-stitch the dried bio-leather sheets using waxed cotton thread into sustainable minimalist card sleeves or notebook covers.

# **Weekly Roundup — October 5 – October 11, 2026**

* **Total Projects Found:** 35 projects documented over the past 7 days (5 per day).  
* **Categories Represented:**  
  * Hardware & Electronics (ESP32 Weather Station, Eye-D BLE Badge, Pi Pico Oscilloscope, LED Matrix Hourglass, Ploopy Magnetic Knob)  
  * Software & Digital (MicroBin, strace-tui, ntfy, croc)  
  * Music & Performance-Adjacent (Optical Gesture Theremin, PVC Pan Flute, Floppy Drive Synth, Laser Harp MIDI, 555 Stylus Synth)  
  * Paper & Print (Suminagashi Water Marbling, Miniature Japanese Stab Binding, Recycled Handmade Paper, Cardstock Mechanical Automata)  
  * Textiles & Fiber Arts (Punch Needle Wall Hanging, Paracord Drawstring Pouch, Sculptural Needle Felting, Amigurumi Crochet)  
  * Garden & Outdoor (Plastic Tote Worm Condo, Single Bucket SIP Planter, Automated Bucket Aeroponics, Gravity-Fed Drip Irrigation)  
  * Chemistry/Kitchen Crafts (Vacuum Bag Lacto-Fermentation, Honeycomb Beeswax Candles, Casein Milk Plastic, Kombucha Bio-Leather)  
  * Games & Puzzles (Cardboard Platformer, Custom 3D Marble Maze, Cardstock Cipher Disk, Makey Makey Skee-Ball, Centrifugal Spin Puzzle Box)  
* **Top Projects Worth Revisiting or Building:**  
  4. **The Ploopy Knob (Hardware & Electronics):** A brilliant open-source peripheral replacing wear-prone mechanical potentiometers with a contactless 12-bit magnetic sensor and ball bearing. High daily utility for volume or video scrubbing.  
  5. **Kombucha Bacterial Cellulose Bio-Leather (Chemistry/Kitchen Crafts):** An inspiring introduction to DIY biomaterials and kitchen biotechnology, demonstrating how simple tea and sugar fermentation produces a sturdy vegan leather substitute.  
  6. **strace-tui (Software & Digital):** A powerful developer tool that turns overwhelming Linux system call logs into an interactive, navigable terminal UI for diagnosing permissions and latency bottlenecks.

# **October 12, 2026**

# **1\. Headscale: Self-Hosted Open-Source Tailscale Control Server (Software & Digital)**

* **Source:** [Headscale: An Open Source Implementation of the Tailscale Control Server — GitHub](https://github.com/juanfont/headscale)  
* **Summary:** Developer Juan Font created Headscale, a fully open-source, self-hosted implementation of the WireGuard-based Tailscale control server written in Go. It enables self-hosters to deploy a private mesh VPN coordinator on their own hardware with zero third-party cloud dependence, supporting cross-platform peer registration, multi-user namespaces, custom DERP relay nodes, and seamless connection with official open-source Tailscale client applications.  
* **Difficulty / Time:** Intermediate; roughly 1–2 hours to deploy via Docker and configure DNS records.  
* **Tweak It:**  
  * Deploy the Headplane web management UI alongside Headscale in Docker to manage device keys, routes, and ACLs visually in the browser.  
  * Configure a custom MagicDNS namespace to auto-assign memorable .internal hostnames to all phones, laptops, and home servers across your mesh.  
  * Integrate OpenID Connect (OIDC) through an identity provider like Authentik or Authelia to enforce multi-factor authentication on every newly added device.

# **2\. Inverted 2-Liter Soda Bottle Hydroponic Planter (Garden & Outdoor)**

* **Source:** [Hydroponic Soda Bottle System — Instructables](https://www.instructables.com/Hydroponic-Soda-Bottle-System/)  
* **Summary:** A zero-cost indoor gardening hack that transforms a recycled 2-liter plastic beverage bottle into a self-watering passive sub-irrigated hydroponic grower. The top funnel portion of the bottle is cut off and inverted into the base reservoir, with an absorbent microfiber or cotton wick threading through the bottle spout into a growing medium of perlite and expanded clay pebbles to continuously draw nutrient solution to plant root systems.  
* **Difficulty / Time:** Beginner; roughly 20–30 minutes of measuring, cutting, and wicking.  
* **Tweak It:**  
  * Wrap the transparent lower water reservoir in dark construction paper or opaque vinyl to block ambient light and prevent green algae blooms.  
  * Drill tiny aeration holes around the neck of the inverted funnel above the water line to enhance passive oxygen exchange around upper roots.  
  * Connect a series of inverted bottle planters via 1/4-inch flexible airline tubing into a single central reservoir bucket for automated multi-pot water equalization.

# **3\. Backstrap Card Weaving Using Recycled Playing Cards (Textiles & Fiber Arts)**

* **Source:** [Card Weaving: How to Make Your Own Cards From Recycled Materials — Instructables](https://www.instructables.com/Card-weaving-how-to-make-your-own-cards-from-rec/)  
* **Summary:** An ancient textile craft where square cards cut from discarded playing cards act as miniature handheld rotating looms to weave dense, patterned structural bands. Four corner holes punched in each card hold warp threads that shift shed positions with quarter-turns of the card pack, while tension is anchored simply between the weaver's waist belt and a fixed table leg (backstrap style), producing durable decorative woven straps and camera lanyards without wooden floor looms.  
* **Difficulty / Time:** Beginner to Intermediate; roughly 1.5–2 hours of card punching, thread warping, and weaving.  
* **Tweak It:**  
  * Use mercerized cotton crochet thread or embroidery floss in high-contrast color palettes to weave complex historical medieval double-faced geometric motifs.  
  * Interweave flexible conductive thread along the selvedge edges to turn the woven strap into an integrated wearable sensor ribbon or power bus.  
  * Finish the band ends by braiding the remaining warp fringe into twin tassels fitted with heavy-duty plastic swivel snap clips.

# **4\. Hexa U.T.C: Hexadecimal Unix Time Clock (Hardware & Electronics)**

* **Source:** [Hexa U.T.C Displays Unix Time in Hex — Hackaday](https://hackaday.com/tag/unix-time/)  
* **Summary:** Maker danjovic built an unorthodox microcontroller desk clock called Hexa U.T.C, powered by an ESP32-S2 development board and an 8-digit 7-segment display driven by a TM1638 I/O controller. The ESP32 connects to local Wi-Fi to synchronize real-time UTC via Network Time Protocol (NTP), converting the continuous 32-bit second counter since the 1970 Unix epoch into an 8-character hexadecimal readout that counts up every second.  
* **Difficulty / Time:** Beginner to Intermediate; roughly 2–3 hours of breadboarding, module wiring, and Arduino C++ firmware flashing.  
* **Tweak It:**  
  * Add a dual-mode button that toggles the display between raw hexadecimal Unix seconds and local 24-hour decimal time (HH-MM-SS-MS).  
  * Program a flashing visual countdown warning on the display as an educational alert visualizing the impending Year 2038 32-bit integer overflow.  
  * Encase the board and LED display in a snap-together 3D-printed modular desktop wedge enclosure with a diffused smoky front bezel.

# **5\. Modular Origami Sonobe Polyhedra (Paper & Print)**

* **Source:** [Modular Origami: Sonobe Polyhedra — Instructables](https://www.instructables.com/Modular-Origami-Sonobe-Polyhedra/)  
* **Summary:** A geometric paper engineering project where identical parallelograms known as Sonobe units are folded from square origami paper and assembled into complex three-dimensional geometric polyhedra. Each unit features angled pockets and tabs that tuck tightly into adjacent modules without tape, glue, or fasteners, allowing makers to construct sturdy multi-colored geometric cubes (6 units), stellated octahedra (12 units), or icosahedra (30 units).  
* **Difficulty / Time:** Beginner (cubes) to Intermediate (30-unit stellated icosahedron); roughly 1–2 hours.  
* **Tweak It:**  
  * Fold the units from heavy iridescent metallic or dual-toned origami paper to produce striking reflective geometric table sculptures.  
  * Insert a battery-powered micro LED fairy light strand inside the hollow core before sliding the final locking unit in place to turn the polyhedron into a faceted geometric lantern.  
  * Scale down paper squares to 1.5-inch squares to fold miniature Sonobe units, coating the finished interlocking polyhedron in non-toxic water-based glaze to craft geometric earrings or charms.

# **October 13, 2026**

# **1\. An E-Book Reader, But Just For Haiku (Hardware & Electronics)**

* **Source:** [An E-Book Reader, But Just For Haiku — Hackaday](https://hackaday.com/2021/02/18/)  
* **Summary:** Maker Roni Bandini created a dedicated pocket-sized electronic poetry reader driven by an ESP32 microcontroller paired with a 2.9-inch Waveshare monochrome e-paper display. Utilizing the GxEPD library inside a custom 3D-printed enclosure, the device pulls formatted 5-7-5 syllable haiku poetry from internal memory or Wi-Fi, refreshing with crisp paper-like readability in direct sunlight while sipping negligible battery power during deep sleep cycles.  
* **Difficulty / Time:** Beginner to Intermediate; roughly 2–3 hours of circuit assembly, 3D printing, and Arduino IDE flashing.  
* **Tweak It:**  
  * Connect the ESP32 to a local Wi-Fi network to pull a daily haiku or quote from an open REST API or personal RSS feed every morning at 7:00 AM.  
  * Add a push-button interrupt or tilt sensor that wakes the MCU from deep sleep and cycles to a fresh poem on demand.  
  * Swap the 2.9-inch monochrome panel for a 3-color (black, white, red) e-paper screen to accent the first character of each stanza in crimson ink.

# **2\. Twisty 2: High-Density 18-Knob Raspberry Pi Pico MIDI Controller (Music & Performance-Adjacent)**

* **Source:** [Wireless MIDI Controller Has Lots Of Knobs — Hackaday](https://hackaday.com/tag/midi-controller/)  
* **Summary:** Maker rheslip built Twisty 2, an expressive tactile hardware MIDI controller powered by a Raspberry Pi Pico / Pico W microcontroller. It interfaces with an array of 18 clickable rotary encoders through a 74HC4067 analog/digital multiplexer chip, accompanied by per-encoder SK6812 RGB status LEDs and an OLED display, transmitting custom MIDI CC and note messages over USB or wireless Bluetooth MIDI.  
* **Difficulty / Time:** Intermediate; roughly 5–7 hours of multi-encoder wiring, multiplexer soldering, and MicroPython firmware tuning.  
* **Tweak It:**  
  * Assign the rotary knobs to map directly to software synthesizer parameters (filter resonance, ADSR envelope, delay feedback) inside Ableton Live or Bitwig.  
  * Use the addressable SK6812 LEDs to show color-coded parameter values, glowing brighter as virtual knobs are cranked from 0 to 127\.  
  * 3D print custom knurled potentiometer caps in contrasting dual-tone filament colors for a professional tactile studio aesthetic.

# **3\. Concentric Cylindrical Labyrinth Puzzle Box (Games & Puzzles)**

* **Source:** [Labyrinth Puzzle Box — Instructables](https://www.instructables.com/Labyrinth-Puzzle-Box-1/)  
* **Summary:** A mechanical sequential discovery puzzle container designed and 3D printed in PLA with two nested concentric cylinders. The inner locking core features hidden protruding pins that engage a serpentine 2-axis maze channel carved into the inner wall of the outer cylinder; players must twist, slide, and orient the components blind by tactile feedback alone to guide the pins out of dead ends and unlock the secret storage vault.  
* **Difficulty / Time:** Beginner to Intermediate; roughly 1 hour slicing and assembly plus 6–8 hours 3D printing.  
* **Tweak It:**  
  * Redesign the maze channel with false gating notches that make audible mechanical clicks to mislead players down deceptive dead-end pathways.  
  * Scale up the inner cylinder diameter to snugly fit rolled gift cards, cash, or a USB thumb drive as a puzzle vault for celebrations.  
  * Print the outer cylinder with a slight spiral taper or textured grip ribs to make rotational manipulation comfortable and slip-free.

# **4\. Naturally Carbonated 2-Liter Bottle Ginger Beer (Chemistry/Kitchen Crafts)**

* **Source:** [Homemade Ginger Beer (Like Ale, Except Brewed Yourself\!) — Instructables](https://www.instructables.com/Homemade-ginger-ale/)  
* **Summary:** A beginner-friendly biological fermentation project that brews authentic carbonated ginger beer inside an ordinary 2-liter PET plastic beverage bottle. Freshly grated ginger root, raw cane sugar, lemon juice, and active dry yeast are combined in lukewarm dechlorinated water; as the yeast metabolizes simple sugars into natural ethanol and carbon dioxide gas, the sealed plastic bottle pressurizes over 24 to 48 hours, creating a fizzy effervescent craft beverage without pressurized kegging hardware.  
* **Difficulty / Time:** Beginner; roughly 30 minutes active prep plus 24–48 hours fermentation.  
* **Tweak It:**  
  * Add sliced habanero chili slices or fresh grated horseradish to the ginger brew to create an intensely spicy, throat-warming craft soda.  
  * Substitute refined white sugar with piloncillo, turbinado, or dark brown molasses sugar to impart rich caramel notes and deep amber coloration.  
  * Chill the bottle down to 2°C in the refrigerator immediately once the plastic walls become rock-hard to put yeast into dormancy and prevent over-carbonation.

# **5\. Hand-Knotted Cotton Macrame Messenger Bag (Textiles & Fiber Arts)**

* **Source:** [How to Make a Macrame Messenger Bag — Instructables](https://www.instructables.com/How-to-Make-a-Macrame-Messenger-Bag/)  
* **Summary:** A functional fiber arts project that hand-knots an everyday crossbody messenger bag using natural 4mm cotton cords. By anchoring 20 lark's head knots to a working guide and working alternating square knot meshes, diagonal double half-hitches, and reinforced gathering knots, the maker constructs the structured front flap, gusset walls, and an integrated durable shoulder strap without sewing needles or machine stitching.  
* **Difficulty / Time:** Intermediate; roughly 4–6 hours of rhythmic cord knotting and tensioning.  
* **Tweak It:**  
  * Dip-dye the bottom third of the finished bag in natural indigo or cold-water fabric dye to create a soft, bohemian ombre gradient.  
  * Line the interior of the woven bag with a sewn linen or canvas drop-in pouch with a zipper to safely hold smaller items like pens and lip balm.  
  * Replace the cotton rope for the crossbody strap with tightly braided 550 military paracord to increase load-bearing strength and abrasion resistance.

# **October 14, 2026**

# **1\. Origami Flasher: Kinetic Collapsible Mechanism (Paper & Print)**

* **Source:** [Origami Flasher — Instructables](https://www.instructables.com/Origami-Flasher-1/)  
* **Summary:** A captivating kinetic paper engineering project that folds a single square sheet of paper into a collapsible tessellation disc based on Jeremy Shafer\&apos;s design. By establishing a dense grid of intersecting mountain and valley diagonal creases, the paper collapses inward into a compact spiral disc that explosively blossoms and expands when pulled by opposite diagonal corners.  
* **Difficulty / Time:** Intermediate; roughly 1.5–2 hours of careful pre-creasing and collapsible forming.  
* **Tweak It:**  
  * Fold the flasher from Tyvek or synthetic polymer paper (Yupo) to allow thousands of repeated opening and closing cycles without tearing.  
  * Scale up the crease pattern into an 8x8 or 16x16 grid to construct an ultra-dense origami umbrella or deployable parabolic dish.  
  * Attach circular cardboard end-plates to the front and back to turn the flasher into an expandable fidget cylinder or self-closing accordion lampshade.

# **2\. Natural Beeswax and Coconut Oil Solid Lotion Bars (Chemistry/Kitchen Crafts)**

* **Source:** [Beeswax Lotion Bars — Instructables](https://www.instructables.com/Beeswax-Lotion/)  
* **Summary:** A water-free cosmetic chemistry project that formulates firm, deeply moisturizing lotion bars by melting unrefined yellow beeswax pellets, virgin coconut oil, and shea butter in equal proportions. Heated gently over low heat and blended with sweet orange and lavender essential oils, the molten lipid mixture is poured into silicone baking molds where it cools into solid bars that melt slightly on contact with warm skin without greasy residue.  
* **Difficulty / Time:** Beginner; roughly 30 minutes active prep plus 1 hour cooling.  
* **Tweak It:**  
  * Add 1% zinc oxide powder or arrowroot starch to the warm liquid blend to cut down oiliness and leave a velvety, powdery finish on the skin.  
  * Infuse the coconut oil with dried calendula flowers or green tea leaves before melting to add natural soothing antioxidants.  
  * Pour the liquid mixture into a clean twist-up deodorant stick container to create a portable, mess-free travel balm for dry elbows and heels.

# **3\. Solar-Powered Smart Plant Tag with Tricolor E-Paper (Hardware & Electronics)**

* **Source:** [Epaper Smart Plant Tag — Hackaday](https://hackaday.com/tag/epaper/page/2/)  
* **Summary:** Maker Jon developed an ultra-low-power environmental plant monitor built on a custom PCB featuring integrated capacitive soil moisture probe prongs, an ESP32-S module, and a 2.9-inch Waveshare tricolor (black, white, red) e-paper screen. Flashed with ESPHome and waking briefly from deep sleep, the device measures soil moisture, ambient temperature, humidity, and light levels, displaying clean graphical indicators on the e-ink screen while syncing data over Wi-Fi to Home Assistant.  
* **Difficulty / Time:** Intermediate; roughly 4–6 hours across PCB assembly, component soldering, and ESPHome YAML configuration.  
* **Tweak It:**  
  * Add a miniature 5V monocrystalline solar cell with a TP4056 charger and 1000mAh LiPo battery to allow completely indefinite off-grid operation on a windowsill.  
  * Program a red e-paper warning banner that triggers on the display only when soil moisture drops below 15% to serve as a high-visibility glanceable watering reminder.  
  * Swap ESPHome for custom MicroPython firmware that broadcasts Bluetooth Low Energy (BLE) BTHome advertisement packets, eliminating Wi-Fi power draw.

# **4\. Aerodynamic Sled Kite from a Plastic Garbage Bag (Games & Puzzles)**

* **Source:** [How to Make a Sled Kite — Instructables](https://www.instructables.com/How-to-make-a-Sled-Kite/)  
* **Summary:** A lightweight, self-inflating ram-air sled kite built using a heavy-duty plastic garbage bag, drinking straws, and duct tape. Symmetrical triangular wings with central vents are traced onto the plastic sheet using a half-pattern template, reinforced along the outer spars with joined drinking straws, and rigged with a dual-loop bridle string to catch incoming winds without needing rigid crossbars or heavy spars.  
* **Difficulty / Time:** Beginner; roughly 30–45 minutes of measuring, cutting, and bridle tuning.  
* **Tweak It:**  
  * Replace drinking straws with carbon fiber or fiberglass micro-rods to allow the kite to fly in high-velocity coastal winds without spar buckling.  
  * Add trailing ribbon tails cut from contrasting plastic bags to increase aerodynamic drag and provide visual tracking in gusty wind conditions.  
  * Scale up the blueprint dimensions by 200% onto ripstop nylon with stitched seams to create a heavy-duty packable pocket kite.

# **5\. bottom: Cross-Platform Terminal System & Process Monitor (Software & Digital)**

* **Source:** [bottom: Yet Another Graphical Process/System Monitor — GitHub](https://github.com/clementtsang/bottom)  
* **Summary:** Developer Clement Tsang created bottom (btm), an open-source, terminal-based graphical process and system monitor written in Rust using Ratatui. It visualizes real-time CPU core utilization, memory allocations, disk I/O, network bandwidth, and running processes with smooth animated charts, supporting mouse clicks, dynamic time-scaling, and deep process filtering directly in any terminal emulator.  
* **Difficulty / Time:** Beginner; roughly 15 minutes to install via Cargo or package managers and configure custom keybindings.  
* **Tweak It:**  
  * Create a customized TOML layout config that strips out the process table to display a minimal 4-pane system health dashboard on a dedicated secondary terminal monitor.  
  * Run bottom in a headless remote session over SSH inside tmux to monitor background compilation jobs or GPU training runs without graphical overhead.  
  * Map custom shell scripts to specific keyboard shortcuts inside bottom to kill runaway memory-leaking processes with a single keypress.

# **October 15, 2026**

# **1\. Paracord Monkey's Fist Knot Fob (Textiles & Fiber Arts)**

* **Source:** [Paracord Monkey's Fist — Instructables](https://www.instructables.com/Paracord-Monkeys-Fist-1/)  
* **Summary:** A traditional sailor's knot-tying project that weaves 550 military-spec nylon paracord around a small spherical core (like a wooden bead or marble) using three mutually perpendicular sets of concentric wraps. The maker winds four to five loops in each axis, carefully adjusting and tightening the cord strand by strand to create a dense, perfectly spherical knot finished with a decorative hangman's loop or snake-knot lanyard for keychains and zipper pulls.  
* **Difficulty / Time:** Beginner to Intermediate; roughly 30–45 minutes of winding and gradual strand tensioning.  
* **Tweak It:**  
  * Wrap a solid rubber bouncy ball instead of a hard core to produce a lightweight, impact-absorbing safety fob that bounces when dropped.  
  * Interweave two contrasting colors of paracord (e.g. neon safety orange and black) to create a dual-tone checked knot surface.  
  * Conceal a rolled emergency twenty-dollar bill or water purification tablets inside a hollow plastic capsule at the center of the knot.

# **2\. Handheld Electronic Farkle Dice Game (Hardware & Electronics)**

* **Source:** [Handheld Electronic Dice Game — Hackaday](https://hackaday.com/tag/dice/page/2/)  
* **Summary:** Maker Sunyecz22 built a portable electronic tabletop dice game console powered by an Arduino Pro Mini and two MAX7219 display driver ICs. Housed inside a sleek curved 3D-printed enclosure, the device illuminates 42 individual LEDs arranged in six traditional dice pip patterns, featuring capacitive touch pads to bank scored dice, an LED 7-segment display for current turn tallies, and an OLED screen tracking multi-player total scores.  
* **Difficulty / Time:** Intermediate; roughly 4–6 hours across PCB assembly, 3D printing, and Arduino game logic coding.  
* **Tweak It:**  
  * Add an MPU6050 accelerometer inside the chassis so players can physically shake the device like a dice cup to trigger randomized dice rolls.  
  * Program an automated single-player AI opponent that calculates optimal statistical risk thresholds for banking points in Farkle.  
  * Add a miniature coin vibration motor to deliver tactile haptic clicks whenever a scoring combination or "Farkle" bust occurs.

# **3\. Artisanal Whole-Grain Mustard from Scratch (Chemistry/Kitchen Crafts)**

* **Source:** [How To: Make Your Own Mustard\! — Instructables](https://www.instructables.com/How-to-make-you-own-mustard/)  
* **Summary:** A kitchen biotechnology and flavor chemistry project where whole yellow and brown mustard seeds are cold-soaked in water and white wine vinegar with sea salt and spices. The liquid cold-soak activates the endogenous myrosinase enzyme to hydrolyze sinigrin glucosinolates into spicy allyl isothiocyanate pungent oils, while acid from the vinegar halts enzymatic degradation to lock in a bright, fiery heat before the mixture is coarse-blended into grainy country-style mustard.  
* **Difficulty / Time:** Beginner; roughly 15 minutes prep \+ 24–48 hours cold steeping.  
* **Tweak It:**  
  * Substitute white wine vinegar with dark stout craft beer or raw apple cider vinegar to introduce deep malty undertones.  
  * Fold in raw wildflower honey, crushed cracked black pepper, and minced fresh tarragon after blending for a sweet French bistro spread.  
  * Keep half of the mustard seeds whole while blending the other half smooth with turmeric powder to create a textured, two-tone coarse Dijon mustard.

# **4\. Cardboard Arduino MIDI Drum Pad (Music & Performance-Adjacent)**

* **Source:** [Cardboard MIDI Drum Pad — Instructables](https://www.instructables.com/Cardboard-MIDI-Drum-Pad/)  
* **Summary:** A responsive velocity-sensitive digital percussion controller built using heavy corrugated cardboard, repurposed neoprene foam mouse pads, brass piezo sensor discs, and an Arduino microcontroller. Sticking drumsticks against the padded strike surfaces generates instantaneous piezoelectric voltage spikes proportional to impact force, which the Arduino converts into standard USB MIDI Note-On messages with dynamic velocity to trigger realistic drum samples inside a DAW.  
* **Difficulty / Time:** Beginner to Intermediate; roughly 3–4 hours of cardboard cutting, piezo wiring, and Arduino sketch tuning.  
* **Tweak It:**  
  * Add a 10k potentiometer on each pad circuit to serve as an analog threshold sensitivity dial for fine-tuning stick bounce rejection and crosstalk.  
  * Mount an additional piezo sensor inside a hinged cardboard foot pedal to control kick drum or hi-hat pedal open/close triggers.  
  * Connect WS2812 addressable RGB LEDs beneath the strike pads that pulse brightly with colors corresponding to strike velocity.

# **5\. Biodegradable Cardboard Seed Starting Pots (Garden & Outdoor)**

* **Source:** [Seed Starting: Cheap Indoor Methods — Instructables](https://www.instructables.com/How-to-Start-Seeds-Indoors-for-cheap/)  
* **Summary:** An eco-friendly seed germination method that repurposes cardboard toilet paper tubes and pressed-pulp egg cartons into self-contained biodegradable seedling cells. Filled with damp seed starting mix and arranged inside a shallow plastic liner tray, the cardboard walls wick moisture evenly while allowing seedling root hairs to breathe, enabling gardeners to transplant delicate tomato and pepper seedlings directly into garden soil without disturbing root structures.  
* **Difficulty / Time:** Beginner; roughly 30 minutes of measuring, cutting, and soil packing.  
* **Tweak It:**  
  * Mix fine vermiculite and crushed eggshells into the potting mix to improve moisture retention and supply slow-release calcium directly to root tips.  
  * Tent a clear perforated plastic grocery produce bag over the tray to create an internal greenhouse humidity dome that accelerates seed germination.  
  * Fold the bottom tabs of the cardboard tubes inward into interlocking flaps to prevent loose potting soil from falling out when moving cells.

# **October 16, 2026**

# **1\. Kinetic Pop-Up Greeting Card Engineering (Paper & Print)**

* **Source:** [Instructables Pop-Up Card: V-Folds & Parallel Slides — Instructables](https://www.instructables.com/Instructables-Pop-Up-Card/)  
* **Summary:** A hands-on paper mechanics project demonstrating how to design multi-layered pop-up greeting cards using cardstock, a precision hobby knife, and scored fold geometries. The maker utilizes 90-degree symmetrical V-folds alongside parallel sliding box-step cuts; when the card is opened flat, the paper hinges tension outward, lifting flat graphics into a dynamic multi-depth sculptural diorama without springs or fasteners.  
* **Difficulty / Time:** Beginner; roughly 1–2 hours of scoring, cutting, and gluing.  
* **Tweak It:**  
  * Add hidden paper pull-tabs along the edge of the card to actuate secondary moving mechanical elements like waving arms or spinning wheels.  
  * Cut the silhouette layers out of lightweight colored vellum paper to allow ambient light or a small LED to cast soft stained-glass style shadows behind the scene.  
  * Incorporate a concealed micro piezo speaker and copper tape paper circuit that plays a custom 8-bit melody when the card spine unfolds to 90 degrees.

# **2\. Stirling-PDF: Self-Hosted Offline Document Utility Suite (Software & Digital)**

* **Source:** [Stirling-PDF: Local-First Web PDF Tools — GitHub](https://github.com/Stirling-Tools/Stirling-PDF)  
* **Summary:** Developer Anthony Stirling built Stirling-PDF, an open-source, local-first web application that provides a comprehensive suite of PDF manipulation tools without transmitting sensitive files to third-party cloud services. Packaged as a lightweight Docker container, it offers a clean browser UI capable of splitting, merging, compressing, password-protecting, OCR text extracting, page rearranging, and digital signature stamping entirely on local hardware.  
* **Difficulty / Time:** Beginner to Intermediate; roughly 30–45 minutes to spin up via Docker Compose.  
* **Tweak It:**  
  * Deploy Stirling-PDF behind an automated Caddy or Nginx reverse proxy with Cloudflare Access to provide secure, encrypted family document utilities on local devices.  
  * Integrate the Tesseract OCR language pack module to auto-index and convert scanned physical receipts into fully searchable PDF/A archival formats.  
  * Build a custom Python watchdog script that monitors an incoming scans directory and automatically runs Stirling-PDF's REST API endpoints to deskew and compress pages.

# **3\. 3D-Printed Sliding Maze Puzzle Box (Games & Puzzles)**

* **Source:** [Design and 3D Print a Sturdy Puzzle Box — Instructables](https://www.instructables.com/Design-and-3D-Print-a-Sturdy-Puzzle-Box/)  
* **Summary:** A mechanical sequential discovery puzzle box modeled in Autodesk Fusion 360 and 3D printed in PLA with zero screws or metal hardware. The outer walls feature interlocking sliding tile panels that follow hidden internal maze channels; players must shift, slide, and align the exterior tiles through a precise 12-step sequence to clear the internal retaining latches and slide the inner gift drawer open.  
* **Difficulty / Time:** Intermediate; roughly 2 hours of assembly plus 6–8 hours 3D print time.  
* **Tweak It:**  
  * Add magnetic detents using tiny 3mm neodymium magnets pressed into the sliding tiles to give every discrete move a satisfying, crisp tactile click.  
  * Print the maze tracks in contrasting high-visibility filament while printing the cover plates opaque to create an educational visible maze puzzle for beginners.  
  * Scale down the overall CAD footprint to create a pocket-sized EDC pillbox or secret key vault that clips onto a backpack strap.

# **4\. Foraged Black Walnut Calligraphy Ink (Chemistry/Kitchen Crafts)**

* **Source:** [Black Walnut Ink — Instructables](https://www.instructables.com/Black-Walnut-Ink/)  
* **Summary:** A traditional botanical chemistry project that extracts rich natural sepia pigment from the fallen outer husks of foraged black walnuts (Juglans nigra). By boiling the tannin-rich hulls in water over several hours, the maker extracts natural juglone dye molecules, strains the dark liquor through cheesecloth, reduces the liquid to desired color saturation, and stabilizes the ink with powdered gum arabic for smooth dip-pen flow and a whole clove to prevent mold growth.  
* **Difficulty / Time:** Beginner; roughly 2–3 hours of simmering and straining.  
* **Tweak It:**  
  * Add a pinch of ferrous sulfate (iron mordant) to the strained walnut broth to shift the warm golden sepia hue into a deep, velvety purplish-black archival ink.  
  * Substitute water with strong black tea or coffee during the initial simmer to amplify total tannin concentrations and speed up color extraction.  
  * Thicken the cooled ink with extra gum arabic and paint it onto watercolor paper with natural bristle brushes to produce warm monochromatic wash paintings.

# **5\. suutari20: Modular RP2040 Macro Keypad via 3.5mm Jacks (Hardware & Electronics)**

* **Source:** [A Modular Macro Keypad via 3.5mm Jacks — Hackaday](https://hackaday.com/tag/macro-pad/)  
* **Summary:** Maker Squalius built the suutari20, an ultra-modular desktop macro controller powered by a Raspberry Pi Pico (RP2040) running QMK firmware. Instead of soldering keys onto a rigid PCB matrix, the controller houses six 3.5mm TRRS audio jacks wired to the RP2040, allowing makers to plug in modular satellite key pods, volume knobs, or foot pedals anywhere on the desk with standard audio cables.  
* **Difficulty / Time:** Intermediate; roughly 4–6 hours across circuit assembly, 3D printing modular pods, and QMK firmware mapping.  
* **Tweak It:**  
  * Build an analog foot-pedal module using an old sewing machine pedal wired to a 3.5mm plug to map Discord push-to-talk or emergency mute controls.  
  * Program rotary encoder satellite pods to scrub CAD timelines in Fusion 360 or zoom canvas layers in Photoshop with custom QMK modifier keys.  
  * Encase each satellite single-key pod in weighted 3D-printed housings with rubber non-slip feet to keep desktop hotkeys firmly positioned.

# **October 17, 2026**

# **1\. How to Crochet a Classic Ribbed Beanie (Textiles & Fiber Arts)**

* **Source:** [Crocheting a Beanie — Instructables](https://www.instructables.com/Crocheting-a-Beanie/)  
* **Summary:** A foundational fiber arts project that crochets a warm, form-fitting winter beanie using worsted weight yarn and a 5.5mm crochet hook. Initiated with a magic circle, the maker works double crochet stitches in continuous increasing concentric rounds to shape the crown diameter, works straight cylindrical rounds down to ear length, and finishes the rim with alternating front-post and back-post stitches to produce an elastic ribbed brim.  
* **Difficulty / Time:** Beginner; roughly 2–3 hours.  
* **Tweak It:**  
  * Add an oversized faux-fur or fluffy yarn pom-pom secured to the crown with a sewn plastic snap button for easy detaching before machine washing.  
  * Use a variegated or self-striping ombre yarn cake to produce automated horizontal color transitions without weaving in loose ends.  
  * Work with reflective or high-visibility fluorescent acrylic yarn to turn the hat into practical nighttime running or cycling gear.

# **2\. Recycled Plastic Bottle Hanging Planters (Garden & Outdoor)**

* **Source:** [From Scrap to Self-Sustaining: Recycled Planters — Instructables](https://www.instructables.com/From-Scrap-to-Self-Sustaining-Rooftop-Backyard-Chi/)  
* **Summary:** A zero-waste urban gardening project that upcycles discarded 2-liter plastic soda bottles into cascading vertical hanging planters. The maker cuts a generous oval planting window along the side of each horizontal bottle, drills multiple drainage perforations along the lower base, threads nylon paracord through reinforced suspension holes, and fills the interior with compost-amended potting soil to cultivate strawberries, herbs, and flowering companion plants along rooftop railings.  
* **Difficulty / Time:** Beginner; roughly 30–45 minutes of cutting, drilling, and hanging.  
* **Tweak It:**  
  * Paint the outside of the plastic bottles in light-colored outdoor acrylic paint to protect roots from UV degradation and reflect excessive summer heat.  
  * String the bottles in a vertical cascade where overflow drainage holes from the upper bottle drip directly into the soil chamber of the bottle below.  
  * Add a 1-inch bottom layer of expanded clay pebbles or pumice before adding potting soil to prevent waterlogged roots during torrential rainstorms.

# **3\. MIDI-Modding the KORG Monotron with Raspberry Pi & DAC (Music & Performance-Adjacent)**

* **Source:** [Adding MIDI To A Mini Synth Is Easy As Pi — Hackaday](https://hackaday.com/tag/control-voltage/)  
* **Summary:** Maker Zack Scholl transformed the pocket-sized analog KORG Monotron ribbon synthesizer into a fully playable MIDI instrument using a Raspberry Pi and an MCP4725 I2C digital-to-analog converter (DAC). A Python script captures incoming USB MIDI note events from any external keyboard or DAW, calculates the required Control Voltage (CV), and drives the DAC to inject precise analog pitch voltages directly into the Monotron PCB's pitch test pads, featuring an automated audio FFT tuning loop that calibrates pitch accuracy in real time.  
* **Difficulty / Time:** Intermediate; roughly 3–4 hours of fine soldering, circuit wiring, and Python scripting.  
* **Tweak It:**  
  * Swap the Raspberry Pi for a Raspberry Pi Pico with an external DAC or filtered PWM output to create a self-contained, low-power USB MIDI converter that fits inside the Monotron battery compartment.  
  * Add a second DAC channel wired to the Monotron's VCF cutoff test pad to enable dynamic MIDI velocity or mod-wheel filter sweeps.  
  * Build an interactive browser-based web sequencer using the Web MIDI API to send automated arpeggiator patterns directly from a laptop or tablet over USB.

# **4\. Uptime Kuma: Self-Hosted Infrastructure Monitoring Dashboard (Software & Digital)**

* **Source:** [Uptime Kuma: Self-Hosted Monitoring Tool — GitHub](https://github.com/louislam/uptime-kuma)  
* **Summary:** Developer Louis Lam created Uptime Kuma, an open-source, self-hosted monitoring tool written in Node.js and Vue that tracks the uptime, latency, and health of websites, HTTP endpoints, TCP/UDP ports, Docker containers, and DNS records. Deployed as a single Docker container, it provides beautiful status pages for public or internal viewing, certificate expiration tracking, and multi-channel alerting through services like Telegram, Discord, email, and ntfy.  
* **Difficulty / Time:** Beginner to Intermediate; roughly 15–30 minutes to spin up via Docker Compose.  
* **Tweak It:**  
  * Configure Uptime Kuma to monitor internal smart home devices and local IoT endpoints (like ESP32 weather stations or Home Assistant) via ping and HTTP status checks.  
  * Pair Uptime Kuma with a webhook automation script that automatically reboots a crashed Docker container via the Docker socket whenever an endpoint goes down.  
  * Customize the public status page with a custom domain, organizational logo, and dark mode theme to provide transparent real-time status updates for clients or friends.

# **5\. 3D-Printed Mechanical Cryptex Vault (Games & Puzzles)**

* **Source:** [3 D Printed Cryptex — Instructables](https://www.instructables.com/3-D-printed-Cryptex/)  
* **Summary:** A working mechanical combination cipher lock inspired by Dan Brown's The Da Vinci Code, built entirely from 3D-printed PLA parts without metal fasteners. The device consists of a central locking core with protruding alignment teeth and five nested outer code rings embossed with numbers or letters; only when the user rotates the outer rings to line up the correct 5-character passcode do the internal tumbler slots align with the core teeth, allowing the internal storage drawer to release.  
* **Difficulty / Time:** Intermediate; roughly 1 hour of assembly and deburring plus 8–10 hours 3D print time.  
* **Tweak It:**  
  * Make the code rings modular by printing separate inner keyed hubs and outer letter rings, allowing the password combination to be reset dynamically for new escape room challenges.  
  * Scale up the inner cylinder cavity to snugly hold a rolled parchment map, treasure hunt clue, or a USB flash drive.  
  * Print the outer rings in metallic copper or bronze silk PLA and apply an acrylic wash in the debossed letters to give the finished puzzle an authentic antique aesthetic.

# **October 18, 2026**

# **1\. Beeswax Wrap: Reusable Food Wrap from Scrap Cotton (Chemistry/Kitchen Crafts)**

* **Source:** [Beeswax Wrap \- Reusable Substitution for Plastic Wrap — Instructables](https://www.instructables.com/Beeswax-Wrap-Reusable-Substitution-for-Plastic-Wra/)  
* **Summary:** A sustainable zero-waste kitchen craft that converts lightweight 100% cotton fabric scraps into reusable, self-adhesive food wraps. Grated natural beeswax is sprinkled evenly over the fabric sandwiched between sheets of parchment paper and melted with a standard household iron, saturating the cotton fibers so the finished cloth can be molded around bowls, sandwiches, or produce using gentle hand warmth.  
* **Difficulty / Time:** Beginner; roughly 30 minutes of grating, ironing, and cooling.  
* **Tweak It:**  
  * Blend in 15% crushed pine rosin (tree resin) and a splash of jojoba oil with the melted beeswax to dramatically increase wrap stickiness and pliable drape.  
  * Cut the fabric using pinking shears with zigzag edges to prevent threads from fraying along the borders over repeated washings.  
  * Refresh older, creased wraps by placing them back between parchment sheets and giving them a quick reheat with an iron or hairdryer to redistribute the wax.

# **2\. Bicycle GPS Speedometer with Color-Coded LED (Hardware & Electronics)**

* **Source:** [This GPS Speedometer Hangs Off Your Handlebars — Hackaday](https://hackaday.com/blog/page/3680/?78907_com%2C2021-07-02)  
* **Summary:** Maker Jeremy Cook created a minimalist handlebar-mounted bicycle speedometer powered by an Arduino Pro Mini and a compact GPS receiver module. Housed inside a 3D-printed enclosure with a translucent top diffuser, the microcontroller continuously parses NMEA satellite velocity data and drives an RGB LED that shifts color in real time (red when stopped, yellow below 5 km/h, and green when cruising above 5 km/h) without needing an active smartphone connection.  
* **Difficulty / Time:** Beginner to Intermediate; roughly 2–3 hours of 3D printing, circuit soldering, and Arduino programming.  
* **Tweak It:**  
  * Add a tiny 0.96-inch monochrome I2C OLED display inside the lid to show exact numerical speed in km/h, distance traveled, and trip duration alongside the color status.  
  * Incorporate a piezo buzzer that chimes a celebratory double-beep whenever you break a personal speed record on a downhill sprint.  
  * Swap the Arduino Pro Mini for an ESP32 to log GPS coordinates and elevation profiles to internal flash memory, syncing ride logs to Strava over home Wi-Fi when parked.

# **3\. Continuous Origami Kaleidocycle: Dynamic Geometric Papercraft (Paper & Print)**

* **Source:** [Kaleidocycles: Amazing Dynamic Papercraft — Instructables](https://www.instructables.com/Kaleidocycles-amazing-dynamic-papercraft/)  
* **Summary:** A captivating geometric paper mechanism that constructs an endless turning ring of six interconnected triangular tetrahedra folded from a single scored template sheet. By scoring alternating diagonal mountain and valley hinges and gluing the paper tabs into a closed loop, the resulting ring can be rotated infinitely outward and inward in a continuous tumbling motion, revealing four completely different hidden geometric faces.  
* **Difficulty / Time:** Beginner; roughly 45–60 minutes of precision scoring, cutting, and gluing.  
* **Tweak It:**  
  * Draw or print four contrasting geometric op-art or optical illusion patterns across the template faces so the cycle visualizes an animated looping transformation as it turns.  
  * Fold the kaleidocycle from synthetic tear-proof Yupo or Tyvek sheet to ensure the paper hinges withstand thousands of continuous rotations without tearing.  
  * Enlarge the template by 200% onto heavy cardstock to create a modular architectural desk toy or kinetic storybook display.

# **4\. Four-Voice Stepper Motor MIDI Synthesizer (Music & Performance-Adjacent)**

* **Source:** [Four Steppers Make A Four-Voice MIDI Instrument — Hackaday](https://hackaday.com/2020/08/15/four-steppers-make-a-four-voice-midi-instrument/)  
* **Summary:** Maker David Scholten designed the Stepper Synth, an electro-mechanical musical instrument that uses four NEMA 17 stepper motors driven by an Arduino Uno and stepper driver boards to generate four-voice polyphonic music. An Arduino sketch receives MIDI-over-serial commands from a computer and modulates the pulse frequency sent to each motor coil, turning the physical magnetic stepping resonance into buzzing, church-organ-like square wave acoustic pitches accompanied by spinning visual flags on the motor shafts.  
* **Difficulty / Time:** Intermediate; roughly 4–6 hours across motor driver wiring, power supply setup, and Arduino MIDI sketch configuration.  
* **Tweak It:**  
  * Mount acoustic plastic cups or 3D-printed horn resonators over each motor body to naturally amplify acoustic volume and shape acoustic timbre.  
  * Connect the Arduino to an optical MIDI-in DIN jack or USB-MIDI interface on a Raspberry Pi Pico to control the synth directly from a physical keyboard without needing a PC host.  
  * Program auto-cooldown routines into the firmware that automatically cut coil holding current to inactive motors to prevent thermal buildup during rests.

# **5\. Self-Watering Soda Bottle Seed Starter (Garden & Outdoor)**

* **Source:** [How to Create a Self-watering Seed Starter — Instructables](https://www.instructables.com/How-to-Create-a-Self-watering-Seed-Starter/)  
* **Summary:** An upcycled sub-irrigated seed starting chamber constructed from a single 2-liter clear plastic soda bottle. The top third of the bottle is cut and inverted into the base filled with water; a folded paper towel or cotton wick placed through the bottle spout pulls reservoir water upward into potting soil by capillary action, maintaining continuous moisture levels that prevent seed desiccation and mold without daily top-watering.  
* **Difficulty / Time:** Beginner; roughly 15–20 minutes of measuring, cutting, and potting.  
* **Tweak It:**  
  * Wrap the lower water basin in black construction paper or aluminium foil to block sunlight and prevent green algae from establishing in the reservoir.  
  * Invert a second clear plastic bottle dome over the top to act as a miniature greenhouse humidity dome that traps warm moisture during initial seed sprouting.  
  * Add diluted organic liquid kelp fertilizer into the reservoir once second-leaf germination occurs to supply steady micro-nutrients directly to seedling roots.

# **Weekly Roundup — October 12 – October 18, 2026**

* **Total Projects Found:** 35 projects documented over the past 7 days (5 per day).  
* **Categories Represented:**  
  * Software & Digital (Headscale Mesh VPN, bottom System Monitor, Stirling-PDF Suite, Uptime Kuma)  
  * Garden & Outdoor (Inverted Soda Bottle Hydroponics, Cardboard Seed Starting Pots, Recycled Hanging Planters, Soda Bottle Seed Starter)  
  * Textiles & Fiber Arts (Playing Card Tablet Weaving, Paracord Monkey\&apos;s Fist, Ribbed Crochet Beanie)  
  * Hardware & Electronics (Hexa U.T.C Unix Clock, Haiku E-Book Reader, Solar E-Paper Plant Tag, Farkle Electronic Dice, suutari20 Modular Keypad, GPS Handlebar Speedometer)  
  * Paper & Print (Origami Sonobe Polyhedra, Origami Flasher Mechanism, Kinetic Pop-Up Engineering, Origami Kaleidocycle)  
  * Music & Performance-Adjacent (Twisty 2 Pico MIDI, Cardboard Arduino Drum Pad, Monotron Pi MIDI Mod, Stepper Motor Synth)  
  * Games & Puzzles (Labyrinth Puzzle Box, Sled Kite, 3D-Printed Sliding Maze, 3D Cryptex Vault)  
  * Chemistry/Kitchen Crafts (Naturally Carbonated Ginger Beer, Beeswax Lotion Bars, Whole-Grain Mustard, Foraged Walnut Ink, Reusable Beeswax Wraps)  
* **Top Projects Worth Revisiting or Building:**  
  7. **Headscale (Software & Digital):** A self-hosted open-source control coordinator for Tailscale that enables zero-trust private WireGuard mesh networking without relying on external corporate servers.  
  8. **Four-Voice Stepper Motor MIDI Synthesizer (Music & Performance-Adjacent):** A clever acoustic crossover project that turns motor coil stepping frequencies into audible square-wave polyphony with kinetic visual feedback.  
  9. **Beeswax Wrap (Chemistry/Kitchen Crafts):** A practical, zero-waste kitchen craft that replaces single-use plastic wrap using simple cotton fabric remnants, heat, and natural beeswax.

# **October 19, 2026**

# **1\. Atuin: Magical Shell History Synchronization and Search (Software & Digital)**

* **Source:** [Atuin: Magical Shell History — GitHub](https://github.com/atuinsh/atuin)  
* **Summary:** Developer Ellie Huxtable created Atuin, an open-source terminal utility written in Rust that replaces traditional shell history (Ctrl+R) with an encrypted, full-screen interactive SQLite database. It records command duration, exit status, directory context, and timestamp for every command executed across Bash, Zsh, Fish, and Nushell, supporting end-to-end encrypted synchronization across multiple machines without exposing terminal secrets.  
* **Difficulty / Time:** Beginner; roughly 15–20 minutes to install via Cargo or package managers and link shell configurations.  
* **Tweak It:**  
  * Self-host your own private Atuin sync server in Docker on a home server or VPS to maintain full data custody over all encrypted terminal telemetry.  
  * Configure custom keybindings and fuzzy-search filters to quickly pull up past Docker deployment commands or complex kubectl one-liners.  
  * Write a Python or Bash export script that parses Atuin's local SQLite database (\~/.local/share/atuin/history.db) to generate monthly analytics of your most frequent developer CLI workflows.

# **2\. Handmade Bi-Fold Leather Wallet with Saddle Stitching (Textiles & Fiber Arts)**

* **Source:** [Leather Wallet With Etched Detail — Instructables](https://www.instructables.com/Leather-Wallet-With-Etched-Detail/)  
* **Summary:** A traditional leathercraft project that constructs a slim minimalist bi-fold card and cash wallet from vegetable-tanned leather remnants. The maker cuts precision paper templates, skives down interior pocket margins with an edge skiver to minimize bulk, punches stitching holes using diamond-pricking chisels, and hand-sews all seams with durable waxed thread using a two-needle traditional saddle stitch.  
* **Difficulty / Time:** Beginner to Intermediate; roughly 2–3 hours of cutting, edge skiving, and hand-stitching.  
* **Tweak It:**  
  * Burnish the raw exposed leather edges with gum tragacanth, beeswax, and a canvas slicker to achieve a polished, glassy edge finish.  
  * Line the interior card pockets with an RFID-blocking copper or aluminium mesh fabric to shield contactless payment cards from wireless skimmers.  
  * Incorporate a recessed thumb-slide slot on the exterior front pocket for rapid one-handed tap-to-pay transit card access.

# **3\. JoyFon: Compact RP2040 Gamepad for Smartphones (Hardware & Electronics)**

* **Source:** [A Compact Game Controller For Your Phone — Hackaday](https://hackaday.com/2026/08/01/a-compact-game-controller-for-your-phone/)  
* **Summary:** Maker built JoyFon, a compact snap-on gaming controller powered by a Raspberry Pi Pico (RP2040/RP2350) microcontroller running custom gamepad firmware. Housed in an ergonomic 3D-printed enclosure with a central male USB-C plug, it mounts directly to the base of a smartphone, providing four responsive tactile face buttons, a directional D-pad, and shoulder buttons that enumerate as a standard USB HID gamepad for retro emulation in a Game Boy form factor.  
* **Difficulty / Time:** Intermediate; roughly 4–6 hours across 3D printing, micro-switch wiring, and firmware flashing.  
* **Tweak It:**  
  * Add soft silicone conductive rubber button pads salvaged from broken retro controllers beneath the 3D-printed D-pad for a softer, authentic retro feel.  
  * Implement low-power Bluetooth Low Energy (BLE) gamepad mode using a Seeed Studio XIAO ESP32-C3 to eliminate the physical USB-C tether.  
  * Integrate a small 5V USB-C passthrough charging board so the phone and controller can be charged simultaneously during extended gaming sessions.

# **4\. Print and Play Modular Tabletop Board Game (Games & Puzzles)**

* **Source:** [Print and Play Easy to Learn Board Game for All the Family — Instructables](https://www.instructables.com/Print-and-Play-Easy-to-Learn-Board-Game-for-All-th/)  
* **Summary:** A creative game design and paper fabrication project that constructs a complete multi-player tabletop board game from printable digital files. The maker prints segmented modular board tiles on heavy A4 cardstock, laminates the surface with transparent self-adhesive book vinyl to protect the graphics, and cuts custom action cards, spinner dials, and wooden-look cardboard movement sticks for family tabletop gameplay without store-bought plastic components.  
* **Difficulty / Time:** Beginner; roughly 1.5–2 hours of printing, laminating, scoring, and card cutting.  
* **Tweak It:**  
  * Replace cardboard spinner arrows with a 3D-printed miniature dice tower that rolls standard polyhedral dice without dice bouncing off the table.  
  * Mount the board tile sections onto 2mm chipboard backing with cloth-tape hinges to make a folding game board that packs into a compact travel binder.  
  * Design custom character meeples or resource tokens modeled in Tinkercad and 3D printed in contrasting dual-color filament.

# **5\. Sourdough Discard Seeded Artisan Crackers (Chemistry/Kitchen Crafts)**

* **Source:** [Sourdough Crackers\!\! ONLY 4 INGRIDIENTS\! — Instructables](https://www.instructables.com/Sourdough-Crackers-ONLY-4-INGRIDIENTS/)  
* **Summary:** A zero-waste baking chemistry craft that transforms inactive sourdough starter discard into crisp, blistered gourmet snack crackers. By combining fermented discard with melted coconut oil or butter, sea salt, and mixed seeds (chia, flax, and sesame), the baker spreads the batter wafer-thin across parchment paper, par-bakes at 160°C to dehydrate the matrix, scores crisp squares, and bakes until Maillard browning produces a deeply savory, sour crunch.  
* **Difficulty / Time:** Beginner; roughly 10 minutes active prep plus 35–45 minutes baking.  
* **Tweak It:**  
  * Mix freshly cracked black pepper, smoked paprika, and nutritional yeast into the batter to create a vegan cheesy cracker profile.  
  * Brush the warm surface with garlic-infused olive oil and coarse flaky Maldon sea salt immediately after pulling from the oven.  
  * Roll the dough through a hand-cranked pasta roller between parchment sheets to achieve an ultra-consistent paper-thin 1mm cracker snap.

# **October 21, 2026**

# **1\. How to Make a Macrame Wristlet Keychain (Textiles & Fiber Arts)**

* **Source:** [How to Make a Macrame Wristlet Keychain? Step by Step Tutorial — Instructables](https://www.instructables.com/How-to-Make-a-Macrame-Wristlet-Keychain-Step-by-St/)  
* **Summary:** A beginner-friendly fiber craft project that weaves natural 3mm twisted cotton cords into a stylish, wearable wristlet keychain. Anchoring the cords to a metal swivel trigger snap clasp with a Lark\&apos;s head knot, the maker works alternating square knots down both strands, gathers the tail in a tight wrap knot, and trims the remaining cotton into a brushed bohemian fringe tassel.  
* **Difficulty / Time:** Beginner; roughly 20–30 minutes of rhythmic knotting without needles or special tools.  
* **Tweak It:**  
  * Substitute natural cotton cord with 550 military paracord to turn the wristlet into an outdoor emergency survival lanyard.  
  * Thread natural wooden or ceramic beads between square knot intervals to introduce decorative weight and organic visual accents.  
  * Dip-dye the lower cotton fringe in cold-water fabric dye or turmeric tea to create a vibrant ombre dip-dyed accent.

# **2\. Tulip: Standalone MicroPython Music Workstation on ESP32 (Music & Performance-Adjacent)**

* **Source:** [Tulip Is A Micropython Synth Workstation, In An ESP32 — Hackaday](https://hackaday.com/2024/08/08/tulip-is-a-micropython-synth-workstation-in-an-esp32/)  
* **Summary:** A music-making portable workstation and digital synthesizer built entirely on an ESP32-S3 microcontroller running a custom MicroPython operating system. The system drives 32-voice stereo polyphony, FM, additive and physical modeling synthesis, multi-track step sequencing, visual display rendering, and plug-and-play USB MIDI keyboard input without requiring a laptop or external computer.  
* **Difficulty / Time:** Intermediate; roughly 3–4 hours to assemble the ESP32-S3 board, wire an audio DAC jack, and flash the Tulip OS firmware.  
* **Tweak It:**  
  * Connect an external I2S audio codec board (like the PCM5102A) to unlock pristine 24-bit/96kHz high-resolution audio line output.  
  * Map physical analog potentiometers or slider faders to the ESP32\&apos;s ADC pins to give live tactile control over filter cutoffs and envelope attack times.  
  * Battery-power the unit with a 3.7V LiPo pouch cell and a TP4056 charging shield housed in a custom 3D-printed handheld console enclosure.

# **3\. Self-Watering Planter from an Upcycled Plastic Bottle (Garden & Outdoor)**

* **Source:** [Self Watering Planter From a Plastic Bottle — Instructables](https://www.instructables.com/Self-Watering-Planter-From-a-Plastic-Bottle/)  
* **Summary:** A zero-waste desktop gardening build that transforms a discarded plastic drink bottle into an automated sub-irrigated planting container. By cutting the bottle into two halves, drilling a hole through the bottle cap, and threading an absorbent cotton cord wick into the soil, the inverted upper half continuously wicks moisture upward from the bottom water reservoir, keeping herbs and houseplants perfectly hydrated for up to two weeks without soil sogginess.  
* **Difficulty / Time:** Beginner; roughly 15–20 minutes of measuring, cutting, and wicking.  
* **Tweak It:**  
  * Paint the outside of the lower water reservoir with opaque outdoor acrylic paint to prevent ambient sunlight from triggering green algae growth in the water.  
  * Add a float indicator using a cut plastic drinking straw and a small cork bead inside the reservoir to monitor water levels at a glance.  
  * Invert a second clear plastic bottle dome over the seedling chamber to act as a mini humidity greenhouse dome that accelerates seed sprouting.

# **4\. A Cube Full of Stars: Geometric Modular Origami (Paper & Print)**

* **Source:** [A Cube Full of Stars (Modular Origami) — Instructables](https://www.instructables.com/A-Cube-Full-of-Stars-modular-Origami/)  
* **Summary:** An intricate geometric paper engineering project where 12 identically folded square sheets of paper interlock into a three-dimensional cubic sculpture. Each folded unit features geometric pockets and flaps that interweave symmetrically to form a raised, multi-faceted dimensional star on each of the cube\&apos;s six faces, held together entirely by structural paper friction without tape, glue, or scissors.  
* **Difficulty / Time:** Intermediate; roughly 1–2 hours of precise pre-creasing and careful multi-unit assembly.  
* **Tweak It:**  
  * Fold the 12 units using six pairs of contrasting dual-tone origami paper so each opposing star facet displays an alternating color pattern.  
  * Place a battery-powered micro LED fairy light strand inside the hollow core before sliding the final locking flap in place to create a geometric ambient nightlight.  
  * Scale down the paper to 5cm miniature squares to fold a compact geometric polyhedral ornament that can be hung with a nylon suspension cord.

# **5\. gping: Real-Time Ping with Interactive Terminal Graphs (Software & Digital)**

* **Source:** [gping: Ping, but with a graph — GitHub](https://github.com/orf/gping)  
* **Summary:** Developer Tom Forbes created gping, an open-source command-line network diagnostic utility written in Rust using the Ratatui terminal UI framework. Rather than scrolling endless rows of text latency outputs, gping plots real-time dynamic line graphs of network round-trip time directly in the terminal window, supporting simultaneous multi-host latency comparisons and custom shell command execution benchmarking.  
* **Difficulty / Time:** Beginner; roughly 10–15 minutes to install via Cargo or package managers and set up shell aliases.  
* **Tweak It:**  
  * Graph multiple international DNS resolvers simultaneously (e.g. gping 1.1.1.1 8.8.8.8 9.9.9.9) to visually benchmark provider jitter and packet drop during gaming or streaming.  
  * Use gping\&apos;s \--cmd execution mode to benchmark and graph the execution duration of recurring local shell scripts or API curl calls over time.  
  * Customize line colors, buffer windows, and chart scales in a global configuration file to match your personal terminal color theme.

# **October 21, 2026 (Daily Scheduled Edition)**

# **1\. Tiny E-Paper Display Delivers 30 FPS Of Game Boy Fun (Hardware & Electronics)**

* **Source:** [Tiny E-Paper Display Delivers 30 FPS Of Game Boy Fun — Hackaday](https://hackaday.com/2026/10/14/tiny-e-paper-display-delivers-30-fps-of-game-boy-fun/)  
* **Summary:** Maker Bo built a pocket-sized retro handheld console powered by a microcontroller that drives an ultra-low-power reflective e-paper display at an astonishing 30 frames per second using custom partial-refresh waveform hacking. Housed in a compact 3D-printed enclosure with tactile directional gamepad buttons, the handheld plays original Game Boy ROMs outdoors in direct sunlight with zero motion ghosting or backlight eye fatigue.  
* **Difficulty / Time:** Advanced; roughly 6–8 hours across 3D printing, fine display soldering, and custom display timing driver compilation.  
* **Tweak It:**  
  * Add a front-facing warm-white micro LED light pipe inside the bezel to allow comfortable nighttime gameplay in dark rooms.  
  * Implement a software palette switcher that maps 2-bit grayscale Game Boy pixels to custom high-contrast dithered stippling patterns for crisper sprite visibility.  
  * Encase the battery and board in a transparent resin-free PETG shell with laser-engraved retro cartridge artwork on the back.

# **2\. Authentic Lacto-Fermented Artisan Hot Sauce (Chemistry/Kitchen Crafts)**

* **Source:** [Making Delicious Authentic Fermented Hot Sauce — Instructables](https://www.instructables.com/Making-Delicious-Authentic-Fermented-Hot-Sauce/)  
* **Summary:** A food biotechnology project that ferments fresh chopped chili peppers, garlic cloves, and a 3% sea salt brine in a sealed fermentation vessel fitted with an airlock. Over two to four weeks, naturally occurring lactic acid bacteria (Lactobacillus) metabolize pepper sugars into organic lactic acid, dropping the pH below 3.6 to preserve the mash while developing deep, complex umami flavors before the sauce is puréed with raw apple cider vinegar and bottled.  
* **Difficulty / Time:** Beginner; roughly 30 minutes active prep plus 2–4 weeks passive fermentation.  
* **Tweak It:**  
  * Add charred oak cubes or toasted bourbon barrel chips into the fermentation jar during the mash stage to infuse smoky, vanilla-aged depth.  
  * Blend in fresh mango slices or roasted pineapple during the final purée to balance the sharp habanero heat with sweet tropical acidity.  
  * Test acidity quantitatively with a digital calibrated pH probe before bottling to ensure food safety below pH 3.8 for long-term shelf stability.

# **3\. Simple Leather Passport Travel Wallet (Textiles & Fiber Arts)**

* **Source:** [Simple Leather Passport Wallet — Instructables](https://www.instructables.com/Simple-Leather-Passport-Wallet/)  
* **Summary:** A traditional leatherworking craft that constructs a durable travel wallet tailored to hold a passport, boarding passes, and credit cards from vegetable-tanned leather remnants. The maker cuts pieces from cardstock templates, bevels and skives interior pocket edges to eliminate bulk, punches stitching holes using diamond-pricking irons, and hand-sews the perimeter using a two-needle traditional saddle stitch with waxed thread.  
* **Difficulty / Time:** Beginner to Intermediate; roughly 2–3 hours of cutting, edge skiving, and hand-stitching.  
* **Tweak It:**  
  * Burnish the exposed edges with gum tragacanth and a canvas slicker to produce a glossy, weather-sealed edge profile.  
  * Line the interior passport sleeve with an ultra-thin flexible copper RFID-blocking fabric to protect contactless passport chips from wireless skimmers.  
  * Add a concealed elastic ribbon pen loop along the interior spine fold to securely hold an EDC brass travel pen.

# **4\. Sturdy Double-Walled Origami Gift Box (Paper & Print)**

* **Source:** [Sturdy Little Origami Box — Instructables](https://www.instructables.com/Sturdy-Little-Origami-Box/)  
* **Summary:** A precision geometric paper craft project that folds two square sheets of heavy cardstock or patterned paper into a rigid, double-walled gift box and matching telescoping lid. Utilizing symmetrical valley folds, diagonal corner locks, and reinforced interior wall tucks, the finished modular box achieves structural stiffness comparable to chipboard boxes completely free of glue, tape, or cuts.  
* **Difficulty / Time:** Beginner; roughly 20–30 minutes of measuring, scoring, and folding.  
* **Tweak It:**  
  * Fold the outer lid from vintage map sheets or illustrated book pages and coat with a thin layer of matte water-based sealant for a durable gift keepsake.  
  * Insert scored cardstock dividers into the inner box cavity to organize desk paperclips, memory cards, or jewelry compartments.  
  * Scale up the starting paper square from 15cm to 30cm to create a sturdy, reusable tabletop desktop stationery caddy.

# **5\. Unibox: Sequential Discovery 3D-Printed Puzzle Box (Games & Puzzles)**

* **Source:** [Puzzle Box (Unibox) \- 3D Print — Instructables](https://www.instructables.com/Puzzle-Box-Unibox-3D-Print/)  
* **Summary:** A complex sequential discovery mechanical puzzle box modeled in Autodesk Fusion 360 and 3D printed in PLA with zero metal fasteners. Players must deduce a hidden sequence of sliding wall panels, interlocking internal pins, and a concealed removal key that unlocks secondary latches before the final secret storage vault slides open.  
* **Difficulty / Time:** Intermediate; roughly 2 hours of assembly and tolerance tuning plus 8–10 hours 3D print time.  
* **Tweak It:**  
  * Press miniature neodymium magnets into the locking sliders so each sequential step snaps into place with tactile, audible mechanical feedback.  
  * Print internal sliding rails in a contrasting accent color to allow beginners to visually trace pin paths during assembly and troubleshooting.  
  * Hide an NFC tag inside the innermost secret drawer that unlocks a digital clue or celebratory video when tapped with a smartphone.

# **October 22, 2026**

# **1\. ESP32Synth: Real-Time Multi-Waveform Audio Synthesizer Library (Music & Performance-Adjacent)**

* **Source:** [ESP32Synth : An Audio Synthesis Library For The ESP32 — Hackaday](https://hackaday.com/2026/04/23/esp32synth-an-audio-synthesis-library-for-the-esp32/)  
* **Summary:** Maker developed ESP32Synth, an open-source real-time audio synthesis engine built specifically for the ESP32 microcontroller. Utilizing the chip's dual-core architecture, one core handles MIDI input decoding and sound patch parameters while the second core drives continuous audio synthesis buffers through an external I2S DAC (such as a PCM5102A) or the internal 8-bit DAC, producing polyphonic square, triangle, saw, and sine waveforms with configurable ADSR envelopes and resonant low-pass filters.  
* **Difficulty / Time:** Intermediate; roughly 2–3 hours of breadboard wiring, DAC connection, and Arduino sketch tuning.  
* **Tweak It:**  
  * Add physical 10k potentiometers connected to ESP32 ADC pins to provide real-time tactile controls for filter resonance, attack, and decay times.  
  * Route audio line output through an optocoupler MIDI-in circuit to control the synth directly from a vintage hardware sequencer or MIDI keyboard.  
  * Pair with an onboard BLE-MIDI stack so the synthesizer pairs wirelessly with mobile DAW applications like GarageBand or FL Studio Mobile.

# **2\. Paper Automata Phoenix: Kinetic Wing-Flapping Paper Sculpture (Paper & Print)**

* **Source:** [Paper Automata Phoenix — Instructables](https://www.instructables.com/Paper-Automata-Phoenix/)  
* **Summary:** A purely mechanical papercraft automaton that animates a mythological phoenix with flapping wings using cardstock paper, paper drinking straws, and craft glue. Inside a rigid cardstock pedestal box, a hand-cranked crankshaft turns eccentric paper cams that push and pull vertical paper linkages, translating rotational kinetic motion into an organic, sweeping wing-flap motion cycle without metal gears or motors.  
* **Difficulty / Time:** Beginner to Intermediate; roughly 2–3 hours of scoring, cutting, and alignment.  
* **Tweak It:**  
  * Cut the outer feathers from metallic foil paper or iridescent cardstock to catch ambient light dynamically as the wings flap.  
  * Motorize the main crank axle using a tiny low-RPM 5V geared hobby motor powered by a hidden rechargeable USB battery pack.  
  * Incorporate a concealed paper bellows or reed whistle inside the base box that emits a gentle chirp on each downstroke.

# **3\. Needle Tatting Lace Flower Pendant (Textiles & Fiber Arts)**

* **Source:** [Learn Needle Tatting With My Flower Pendant — Instructables](https://www.instructables.com/Learn-Needle-Tatting-With-My-Flower-Pendant/)  
* **Summary:** A traditional lace-making project that crafts an intricate floral motif using a long blunt needle and size 10 perle cotton embroidery thread. The crafter casts double-half-hitch stitches and decorative picot loops directly over the needle shaft, then slides the clustered stitches off onto the core thread to cinch them into tight, structural lace rings and chains that interlock to form an ornamental pendant without bulky shuttle bobbins.  
* **Difficulty / Time:** Beginner; roughly 1–2 hours of rhythmic needle knotting.  
* **Tweak It:**  
  * Thread seed beads directly onto the working thread before tatting so beads nest inside the decorative picot loops along the petal borders.  
  * Stiffen the finished lace flower with diluted fabric stiffener or sugar water to transform it into a rigid structural brooch or holiday ornament.  
  * Tat with metallic embroidery floss or fine variegated silk cord to produce delicate two-tone gradient lace jewelry.

# **4\. eza: A Modern, Feature-Rich Terminal Replacement for ls (Software & Digital)**

* **Source:** [eza: A Modern Replacement for ls — GitHub](https://github.com/eza-community/eza)  
* **Summary:** An open-source, modern command-line directory lister written in Rust designed as a powerful drop-in replacement for standard Unix ls. Developed by the open-source community, eza leverages color-coded terminal typography, displays extended file attributes, visualizes embedded Git status indicators per file, renders recursive directory tree hierarchies, and shows filetype icons directly in your terminal prompt.  
* **Difficulty / Time:** Beginner; roughly 10–15 minutes to install via Cargo or package manager and configure shell aliases.  
* **Tweak It:**  
  * Set up shell aliases in your .bashrc or .zshrc (e.g. alias ll='eza \-la \--icons \--git') for instantaneous glanceable Git repository status.  
  * Use eza's \--tree \--level=3 flag to generate clean, syntax-highlighted ASCII directory trees for documentation and README files.  
  * Pair eza with a custom theme YAML file in \~/.config/eza/theme.yml to customize file permissions and timestamp color coding to match your terminal emulator palette.

# **5\. DIY Biodegradable Seed Tape for Precision Planting (Garden & Outdoor)**

* **Source:** [Seed Tape: Precision Biodegradable Planting Strips — Instructables](https://www.instructables.com/Seed-Tape/)  
* **Summary:** An ingenious zero-waste gardening technique that manufactures custom planting ribbons using single-ply biodegradable toilet paper, unbleached newsprint, and a homemade paste of flour and water. Tiny seeds with difficult spacing (such as carrots, radishes, and lettuce) are glued at measured spacing intervals along the paper strips; when planted directly in garden furrows and watered, the paper dissolves cleanly into soil while guaranteeing perfectly spaced seedlings without the tedious chore of manual seedling thinning.  
* **Difficulty / Time:** Beginner; roughly 20–30 minutes of measuring, pasting, and drying.  
* **Tweak It:**  
  * Mix a pinch of powdered cinnamon or organic kelp meal into the flour glue to provide natural anti-fungal protection against damping-off disease.  
  * Alternate seeds on a single tape (e.g. fast-sprouting radishes alternating with slow-germinating carrots) to create an automated companion planting ribbon that naturally breaks up compacted soil.  
  * Pre-make several 10-foot seed tape rolls during winter months and store them in sealed airtight paper envelopes for immediate, rapid spring garden bed planting.

# **October 23, 2026**

# **1\. Portable CO2 Monitor with CH32V003 & Sensirion SCD40 (Hardware & Electronics)**

* **Source:** [Portable CO2 Monitor Powered by CH32V003 & Sensirion SCD40 — Hackaday](https://hackaday.com/tag/co2-sensor/)  
* **Summary:** Maker Larry built an ultra-compact pocket-sized carbon dioxide monitor powered by an inexpensive WCH CH32V003 RISC-V microcontroller. It interfaces with an I2C Sensirion SCD40 photoacoustic NDIR sensor to measure real-time CO2 concentrations, temperature, and relative humidity, rendering status readouts and trend graphs on a 128x64 SSD1306 OLED screen powered by an internal LiPo cell and TP4057 charging IC in a custom 3D-printed enclosure.  
* **Difficulty / Time:** Intermediate; roughly 3–4 hours of surface-mount soldering, 3D printing, and C firmware flashing.  
* **Tweak It:**  
  * Add a miniature piezo buzzer to emit subtle audible warning chirps whenever indoor CO2 levels surpass 1,200 ppm to alert you to open a window.  
  * Swap the OLED screen for a small 1.54-inch monochrome e-paper display to extend battery runtime from hours to multiple weeks on a single charge.  
  * Incorporate a tiny RGB indicator LED that casts an ambient glow through a translucent 3D-printed diffuser (green for fresh air, yellow for moderate, red for stuffy).

# **2\. Patterned Fruit Leather: Low-Temperature Dehydration Snacks (Chemistry/Kitchen Crafts)**

* **Source:** [Patterned Fruit Leather — Instructables](https://www.instructables.com/Patterned-Fruit-Leather/)  
* **Summary:** A healthy kitchen dehydration project transforming fresh ripe fruit purées (such as strawberries, mangoes, and bananas) into pliable, shelf-stable fruit leather ribbons. By blending distinct colored fruits with a touch of lemon juice, piping contrasting geometric dots and chevron patterns onto silicone baking mats or parchment paper, and dehydrating at a gentle 60°C (140°F) for 4 to 6 hours, moisture evaporates while concentrating natural pectin, fructose, and fiber into vibrant, chewy fruit strips.  
* **Difficulty / Time:** Beginner; roughly 30 minutes active prep plus 4–6 hours low-temperature drying.  
* **Tweak It:**  
  * Fold ground chia seeds or crushed golden flaxseeds into the purée before spreading to add healthy omega-3 fatty acids and a pleasant seeded crunch.  
  * Swirl in Greek yogurt or coconut cream with the fruit base to create creamy two-tone smoothie leather strips.  
  * Dust the finished dried sheets lightly with citric acid powder and chili salt before rolling to craft tangy sour fruit roll-ups.

# **3\. bat: A Cat Clone with Syntax Highlighting and Git Integration (Software & Digital)**

* **Source:** [bat: A cat(1) clone with wings — GitHub](https://github.com/sharkdp/bat)  
* **Summary:** Developer David Peter built bat, a modern Unix cat replacement written in Rust. It integrates automatic syntax highlighting for over a hundred programming and markup languages, Git modification gutter indicators, non-printable character visualization, and automatic terminal paging through less with a clean, terminal-adaptive layout.  
* **Difficulty / Time:** Beginner; roughly 5–10 minutes to install via Cargo or package managers and configure shell aliases.  
* **Tweak It:**  
  * Set up an alias in your shell configuration (alias cat='bat \--paging=never') to use bat as a syntax-aware terminal viewer across all command-line workflows.  
  * Customize themes and syntax definitions using bat's configuration directory to match your favorite IDE color scheme like Catppuccin or Gruvbox.  
  * Combine bat with fzf in a shell script (fzf \--preview 'bat \--color=always {}') to create an interactive fuzzy file finder with instant syntax-highlighted previews.

# **4\. Build Your Own Folding Game Board (Games & Puzzles)**

* **Source:** [Build Your Own Board Game — Instructables](https://www.instructables.com/Build-your-Own-Board-Game/)  
* **Summary:** A traditional tabletop game fabrication craft detailing how to construct a durable four-quadrant folding game board using 2mm heavy illustration board or dense recycled chipboard. By measuring expansion relief gaps between board quadrants and applying bookbinder's book cloth and linen binding tape along the seams in an alternating accordion hinge, the board folds into a quarter of its footprint without tearing or seam splitting during repeated family gameplay.  
* **Difficulty / Time:** Beginner to Intermediate; roughly 1.5–2 hours of measuring, cutting, and hinging.  
* **Tweak It:**  
  * Print the game board artwork on heavy cardstock and laminate with matte adhesive vinyl before gluing to protect against drink spills and scratches.  
  * Embed tiny flat neodymium disc magnets beneath the board corners so the folded halves snap shut securely for compact transport in a backpack.  
  * Back the underside of the game board with textured black book cloth or felt to provide non-slip grip and prevent tabletop scratching during active games.

# **5\. Origami Self-Locking Letter Envelope (Paper & Print)**

* **Source:** [Origami Envelope — Instructables](https://www.instructables.com/Origami-Envelope/)  
* **Summary:** An elegant paper engineering technique that folds a single rectangular letter sheet or square cardstock into a self-locking postal envelope without adhesive, glue, or scissors. By aligning precise diagonal corner creases, folding interior wing flaps, and tucking the top triangle flap into reinforced opposing envelope pockets, the letter becomes its own tamper-evident, sealed decorative mailer.  
* **Difficulty / Time:** Beginner; roughly 5–10 minutes of folding.  
* **Tweak It:**  
  * Fold from double-sided paper with a patterned exterior and blank interior so written correspondence remains completely hidden until opened.  
  * Seal the locking flap with a drop of traditional flexible sealing wax stamped with a custom metal or 3D-printed seal.  
  * Scale up to heavy watercolor paper and paint botanical border illustrations across the outer folded panels to create bespoke artisanal stationery.

# **October 24, 2026**

# **1\. Stylophone PCB Business Card: Playable ATtiny85 Synthesizer (Music & Performance-Adjacent)**

* **Source:** [Stylish Business Card With A Stylophone Built In — Hackaday](https://hackaday.com/2018/05/11/stylish-business-card-with-a-stylophone-built-in/)  
* **Summary:** Maker Mitxela engineered a functioning electronic musical instrument into a standard 1mm-thick fiberglass PCB business card. Powered by an onboard Microchip ATtiny85 microcontroller and an SMD resistor ladder connected to gold-immersion touch pads, users play musical scales by touching a grounded wire stylus probe across the keyboard traces, while a snap-off edge connector plugs directly into computer USB ports to transmit MIDI note data.  
* **Difficulty / Time:** Intermediate; roughly 2–3 hours of SMD soldering and firmware flashing.  
* **Tweak It:**  
  * Add a miniature surface-mount piezo buzzer and coin-cell battery holder directly onto the back of the card so it can generate standalone acoustic square waves without requiring a computer.  
  * Reprogram the ATtiny85 firmware with a custom pitch-quantizer lookup table to play microtonal scales or blues pentatonic scales.  
  * Route capacitive touch pads instead of resistive divider traces to enable finger-touch polyphony without a metallic stylus wire.

# **2\. Upcycled Denim Sashiko Biscornu Pincushion (Textiles & Fiber Arts)**

* **Source:** [Easy Boro Sashiko Style Biscornu Pincushion — Instructables](https://www.instructables.com/Easy-Boro-Sashiko-Style-Biscornu-Pincushion/)  
* **Summary:** A tactile fiber arts and mending project that transforms discarded denim scrap squares into an intricate eight-sided geometric biscornu cushion. Using fusible interfacing for backing stability, the maker hand-stitches traditional Japanese sashiko running stitch patterns in high-contrast gold and white cotton embroidery floss, then sews the two square panels together by offsetting the corners 45 degrees to produce a dimensional, multi-faceted polygon stuffed with wool scraps.  
* **Difficulty / Time:** Beginner; roughly 1.5–2 hours of rhythmic hand-stitching.  
* **Tweak It:**  
  * Fill the cushion with crushed walnut shells or emery powder instead of polyfill to naturally sharpen and clean sewing pins every time they are inserted.  
  * Incorporate traditional sashiko geometric patterns like asanoha (hemp leaf) or seigaiha (ocean waves) across the panels using a water-soluble transfer grid.  
  * Sew a high-strength neodymium disc magnet inside the bottom center tuft so the cushion securely docks onto a sewing machine table or magnetic wristband.

# **3\. 3D-Printed Mechanical Combination Puzzle Box (Games & Puzzles)**

* **Source:** [Combination Puzzle Box 3D Print — Instructables](https://www.instructables.com/Combination-Puzzle-Box-3D-Print/)  
* **Summary:** A mechanical sequential discovery puzzle vault modeled in CAD and fabricated on an FDM 3D printer using PLA filament. The lid is secured by four independent sliding key bars with internal coded gate notches; players must deduce the correct spatial coordinate sequence to slide each key back and forth, clearing the internal locking pins so the hidden inner storage drawer can slide open.  
* **Difficulty / Time:** Intermediate; roughly 1.5 hours of assembly and tolerance tuning plus 6–8 hours 3D print time.  
* **Tweak It:**  
  * Print the sliding key bars in contrasting color filaments with debossed braille or tactile grooves so the combination can be solved blindly by touch.  
  * Incorporate spring-loaded ball detents into each slider track to provide satisfying mechanical clicks as keys snap into each numerical position.  
  * Scale up the inner drawer cavity to fit a standard playing card deck, gift card, or flash drive for interactive escape room gift giving.

# **4\. Double-Decker Bucket Indoor Vermicompost System (Garden & Outdoor)**

* **Source:** [Indoor Vermicompost — Instructables](https://www.instructables.com/Indoor-Vermicompost/)  
* **Summary:** A compact, odor-free indoor composting system constructed by stacking two standard 5-gallon food-grade plastic buckets. The upper working bucket features a cut wire-mesh floor and side ventilation holes where composting red wiggler worms (Eisenia fetida) process kitchen vegetable scraps and damp cardboard bedding into rich castings, while the lower bucket catches aerated nutrient-dense liquid worm tea for houseplant fertilization.  
* **Difficulty / Time:** Beginner; roughly 45–60 minutes of measuring, cutting, and drilling.  
* **Tweak It:**  
  * Install a plastic push-button drain spigot with a rubber gasket near the bottom of the collection bucket to easily drain liquid fertilizer without lifting the heavy upper tier.  
  * Line the side aeration holes with ultra-fine stainless steel or nylon mesh to guarantee fruit flies and gnats cannot enter or exit the bin.  
  * Insert a digital probe thermometer into the center bedding layer to monitor core compost temperatures and ensure worms remain within their optimal 15°C–25°C activity range.

# **5\. ripgrep: Blazing-Fast Line-Oriented Search Utility (Software & Digital)**

* **Source:** [ripgrep recursively searches directories for a regex pattern — GitHub](https://github.com/burntsushi/ripgrep)  
* **Summary:** Developer Andrew Gallant (BurntSushi) created ripgrep (rg), an open-source command-line search tool written in Rust that recursively searches directories for regular expression patterns. By combining Rust's finite-automata regex engine with automatic directory traversal that respects .gitignore rules, skips binary files, and utilizes multi-threaded memory-mapped file scanning, it dramatically outperforms traditional Unix grep and find.  
* **Difficulty / Time:** Beginner; roughly 5–10 minutes to install via Cargo or system package managers and set up aliases.  
* **Tweak It:**  
  * Create custom aliases in your shell configuration (e.g. alias rgf='rg \--files \| fzf') to turn ripgrep into an instantaneous interactive fuzzy file finder.  
  * Configure a persistent configuration file at \~/.ripgreprc to automatically set preferred color schemes, search flags, and default filetype filters.  
  * Integrate ripgrep directly into Neovim (using Telescope) or VS Code to power instantaneous workspace-wide code symbol and text searches.

# **October 25, 2026**

# **1\. An E-Ink Macropad for Context-Aware Productivity (Hardware & Electronics)**

* **Source:** [An E-Ink Macropad For Improved Productivity — Hackaday](https://hackaday.com/2026/01/29/an-e-ink-macropad-for-improved-productivity/)  
* **Summary:** Maker Bike Cook Robots built an intelligent desktop macro pad powered by an Adafruit RP2040 Feather ThinkInk dev board paired directly with a 4.2-inch electronic ink display and a 3x4 grid of mechanical switches. Housed in a custom 3D-printed desktop frame with a monitor arm mounting bracket, a background Python script on the host PC monitors active application focus and sends serial commands that dynamically refresh the e-ink screen with relevant macro icons for OBS, CAD, or IDE shortcuts.  
* **Difficulty / Time:** Intermediate; roughly 4–6 hours across 3D printing, switch wiring, and Python/QMK integration.  
* **Tweak It:**  
  * Add a clickable rotary encoder on the corner of the frame to dynamically scrub video editing playheads or adjust system volume.  
  * Use a tricolor (black, white, red) e-paper screen to accent active recording states or muted microphone warning badges in vivid red.  
  * Store macro profiles directly on the RP2040's internal flash using CircuitPython so the keypad functions as a standalone plug-and-play USB HID device on any computer without host software.

# **2\. Authentic Bavarian Soft Pretzels with Alkaline Lye Bath (Chemistry/Kitchen Crafts)**

* **Source:** [Authentic Bavarian Pretzels — Instructables](https://www.instructables.com/Authentic-Bavarian-Pretzels/)  
* **Summary:** A traditional culinary chemistry project exploring alkaline starch gelatinization and the accelerated Maillard reaction. Proofed yeast dough is hand-rolled and knotted into classic Bavarian pretzel shapes, chilled to set their structure, and dipped briefly into a mild 3% food-grade sodium hydroxide (lye) solution before being sprinkled with coarse pretzel salt and baked on silicone sheets at 220°C, producing a deeply caramelized mahogany crust with a chewy, soft interior crumb.  
* **Difficulty / Time:** Beginner to Intermediate (safety goggles and gloves recommended for handling lye); roughly 2 hours active time.  
* **Tweak It:**  
  * Substitute sodium hydroxide with baked baking soda (sodium carbonate, produced by baking standard sodium bicarbonate at 150°C for an hour) for a safer food-grade alkaline dip.  
  * Fold shredded sharp cheddar and minced pickled jalapeños into the dough during the kneading stage to create stuffed savory pretzels.  
  * Brush the freshly baked pretzels with melted garlic-herb butter and dip in cinnamon sugar for a sweet carnival variation.

# **3\. Desk Buddy: Interactive ESP32 IoT Companion with Procedural Tilt Maze (Games & Puzzles)**

* **Source:** [DESK BUDDY: a Multi-Function IoT Desk Companion With Games — Instructables](https://www.instructables.com/DESK-BUDDY-a-Multi-Function-IoT-Desk-Companion-Wit/)  
* **Summary:** Maker built Desk Buddy, a smart desktop gaming console and interactive pet powered by an ESP32 microcontroller, an MPU6050 6-axis accelerometer/gyroscope, capacitive touch pads, and a color display in a 3D-printed enclosure. Among multiple interactive modes, it features a procedural tilt maze game where players physically tilt the console in their hands to navigate a rolling virtual ball through dynamically generated labyrinth walls from entrance to exit.  
* **Difficulty / Time:** Intermediate; roughly 3–5 hours across circuit wiring, 3D printing, sensor calibration, and Arduino C++ firmware flashing.  
* **Tweak It:**  
  * Add an internal coin vibration motor to provide tactile haptic bumps whenever the virtual ball collides with maze walls.  
  * Incorporate a global Wi-Fi leaderboard that posts high-speed maze solve times to a shared Google Sheet via a webhook.  
  * Program a dual-player wireless mode over ESP-NOW where two consoles race against each other through the same procedurally generated maze seed.

# **4\. Victorian Thaumatrope: Optical Persistence of Vision Toy (Paper & Print)**

* **Source:** [Valentine's Thaumatropes — Instructables](https://www.instructables.com/Valentines-Thaumatrope/)  
* **Summary:** A foundational 19th-century optical paper craft that animates still images using the human eye's natural persistence of vision (\~1/16th second retinal retention). By cutting a disc of heavy cardstock, drawing complementary illustrations on opposite sides (such as a bird on the front and an empty cage on the back inverted 180 degrees), and spinning the disc rapidly using twisted side cords, the two separate images optically blend into a continuous composite illusion.  
* **Difficulty / Time:** Beginner; roughly 20–30 minutes of cutting, drawing, and threading.  
* **Tweak It:**  
  * Use circular cutouts from printed transparent acetate film layered over white cardstock to experiment with full-color optical color mixing (e.g. blue and yellow circles spinning into vibrant green).  
  * Mount the cardstock disc onto a thin bamboo skewer or paper drinking straw to convert it into a hand-rolled whirligig thaumatrope.  
  * Design multi-frame optical disks that test sequential animation frames, creating a micro two-frame walking or jumping character.

# **5\. Easy Topsy-Turvy Upside-Down Tomato Bucket Planter (Garden & Outdoor)**

* **Source:** [Easy Topsy Turvy Tomatoes for Cheap — Instructables](https://www.instructables.com/Easy-Topsy-Turvy-Tomatoes-for-Cheap/)  
* **Summary:** A high-yield vertical gardening hack that upcycles an ordinary 5-gallon food-grade plastic bucket into an upside-down hanging tomato grower. A 2-inch drainage and stem aperture is cut into the bucket base, lined with a flexible cardboard collar to support the root ball, and packed with compost-rich potting mix before being hung from an outdoor pergola hook by its heavy-duty wire bail handle. Growing tomatoes downward harnesses gravity to boost fluid flow to fruit clusters while eliminating staking, ground cutworms, and soil-borne fungal splash.  
* **Difficulty / Time:** Beginner; roughly 30–45 minutes of cutting, planting, and hanging.  
* **Tweak It:**  
  * Plant shallow-rooted companion crops like sweet basil, parsley, or alpine strawberries on the open top soil surface to double your harvest yield from a single bucket.  
  * Wrap the exterior of dark buckets in white reflective vinyl or burlap to prevent intense summer sun from overheating the root zone.  
  * Insert a vertical 1.5-inch perforated PVC pipe down the center of the bucket to deliver water and liquid worm tea directly to the lower root zone without top soil compaction.

# **Weekly Roundup — October 19 – October 25, 2026**

* **Total Projects Found:** 40 projects documented over the past 7 days across 7 daily runs.  
* **Categories Represented:**  
  * Software & Digital (Atuin Shell Sync, gping Graph Utility, eza Modern ls, bat Cat Clone, ripgrep Regex Search)  
  * Textiles & Fiber Arts (Handmade Bi-Fold Leather Wallet, Macrame Wristlet Keychain, Leather Passport Wallet, Needle Tatting Lace Pendant, Upcycled Denim Sashiko Biscornu)  
  * Hardware & Electronics (JoyFon RP2040 Smartphone Gamepad, Tiny 30 FPS E-Paper Game Boy, Portable CH32V003 CO2 Monitor, Stylophone PCB Business Card, E-Ink Context Macropad)  
  * Games & Puzzles (Print & Play Modular Board Game, Unibox 3D-Printed Puzzle Box, Folding Chipboard Game Board, 3D Combination Puzzle Box, Desk Buddy Tilt Maze)  
  * Chemistry/Kitchen Crafts (Sourdough Discard Seed Crackers, Lacto-Fermented Hot Sauce, Patterned Fruit Leather Dehydration, Bavarian Lye Soft Pretzels)  
  * Garden & Outdoor (Plastic Bottle Self-Watering Planter, Biodegradable Seed Tape Strips, Double-Decker Bucket Worm Composter, Upside-Down Tomato Bucket Planter)  
  * Music & Performance-Adjacent (Tulip ESP32 MicroPython Synth, ESP32Synth Library, Stylophone PCB Synth)  
  * Paper & Print (Modular Origami Cube of Stars, Sturdy Origami Box, Paper Automata Phoenix, Origami Self-Locking Envelope, Victorian Optical Thaumatrope)  
* **Top Projects Worth Revisiting or Building:**

---

# **October 26, 2026**

# **1\. zoxide: A Smarter cd Command for Rapid Terminal Navigation (Software & Digital)**

* **Source:** [zoxide: A smarter cd command — GitHub](https://github.com/ajeetdsouza/zoxide)  
* **Summary:** Developer Ajeet D'Souza created zoxide, an open-source command-line tool written in Rust that supercharges shell directory navigation across Bash, Zsh, Fish, and PowerShell. Inspired by tools like z and autojump, it tracks your most frequently and recently accessed directories using a frecency algorithm, allowing you to jump straight to deeply nested project folders (e.g. typing "z proj" instead of "cd \~/development/work/projects/client-alpha") with fuzzy matching and shell history integration.  
* **Difficulty / Time:** Beginner; roughly 5–10 minutes to install via Cargo or package managers and initialize in your shell config.  
* **Tweak It:**  
  * Integrate zoxide with fzf by running "zi" to open an interactive fuzzy finder that lets you visually browse and filter your frecent directory history.  
  * Export your zoxide database periodically via shell script to backup your cross-system navigation frecency scores across new laptops.  
  * Configure custom directory aliases and priority weighting for ephemeral build or scratch directories that you want excluded from frecency rankings.

# **2\. Using an Unmodified Game Boy Advance as a Hardware Chiptune Synthesizer (Music & Performance-Adjacent)**

* **Source:** [Using An Unmodded GBA As A Music Synth — Hackaday](https://hackaday.com/2026/10/23/using-an-unmodded-gba-as-a-music-synth/)  
* **Summary:** Maker Bryan Cockfield covered an ingenious audio project where an unmodified Nintendo Game Boy Advance is transformed into a dedicated real-time chiptune synthesizer. By leveraging the console's native multiboot feature, custom synthesizer code is transmitted over the link cable port directly into the GBA's RAM on boot from a computer, enabling musicians to generate authentic 8-bit/16-bit square waves and sample playback through the 3.5mm headphone jack with real-time hardware parameter tweaking.  
* **Difficulty / Time:** Intermediate; roughly 1–2 hours to set up the link cable adapter, multiboot injector software, and host MIDI routing.  
* **Tweak It:**  
  * Wire a passive low-pass RC filter circuit into the 3.5mm audio line-out cable to soften harsh digital aliasing and shape analog warmth.  
  * Map the GBA's D-pad and shoulder buttons to trigger custom pitch glides, arpeggios, and bit-crush effects during live synthesizer performances.  
  * Build an Arduino- or RP2040-based standalone link-cable dongle that boots the synth ROM from a microSD card without needing a laptop host.

# **3\. Bohemian Macrame Leaf & Feather Wall Hanging (Textiles & Fiber Arts)**

* **Source:** [Macrame Wall Hanging — Instructables](https://www.instructables.com/Macrame-Wall-Hanging/)  
* **Summary:** A stylish fiber arts craft that sculpts dimensional decorative foliage from natural 3mm and 4mm twisted cotton rope. The maker knots individual leaf clusters along a central cord using alternating square knots and horizontal half-hitches, brushes out the twisted cotton plies using a fine wire pet comb to produce dense feathered fringe, and coats the reverse side in diluted white craft glue to lock the leaf shapes in place.  
* **Difficulty / Time:** Beginner; roughly 1.5–2 hours of cutting, knotting, and comb brushing.  
* **Tweak It:**  
  * Dip-dye the tips of the brushed cotton feathers into natural liquid tea, beet juice, or indigo dye to produce a rustic ombre color fade.  
  * Mount the feather clusters across an upcycled bamboo cane or copper-toned rod with hanging paracord loops for lightweight wall suspension.  
  * Combine varying thicknesses of textured wool yarn and metallic embroidery floss into the fringe to create tactile multi-fiber layered feathers.

# **4\. Cardboard Steampunk Geared Puzzle Box (Games & Puzzles)**

* **Source:** [Cardboard Steampunk Puzzle Box — Instructables](https://www.instructables.com/Cardboard-Steampunk-Puzzle-Box/)  
* **Summary:** A captivating mechanical puzzle box constructed entirely from recycled corrugated cardboard, bamboo skewers, and paper craft glue. The maker fabricates layered cardboard cog gears with reinforced corrugated teeth, concentric sliding discs, and a central locking bolt; players must rotate three interlocking external gears so that viewing windows align in a precise numerical sequence, allowing an internal latch to drop and releasing the concealed treasure drawer.  
* **Difficulty / Time:** Intermediate; roughly 3–4 hours of precision cutting, gear teeth layering, and axle assembly.  
* **Tweak It:**  
  * Paint the exterior in metallic brass and dark copper acrylic washes with faux verdigris patina to complete the industrial steampunk aesthetic.  
  * Add false detent notches and loose ball bearings inside the gear tracks that emit misleading clicking sounds to challenge puzzle solvers.  
  * Scale up the interior drawer dimensions to house a card deck, jewelry, or escape room clues for interactive birthday quest challenges.

# **5\. Post-It Modular Origami Icosahedron (Paper & Print)**

* **Source:** [Post-It Origami Icosahedron — Instructables](https://www.instructables.com/Post-It-Origami-Icosahedron/)  
* **Summary:** A geometric paper engineering build that folds 30 identical square Post-It notes or origami sheets into interlocking modular triangular units. Each sheet is folded with precise diagonal valley folds to create twin locking tabs and receiving pockets; when assembled symmetrically in five-fold and three-fold clusters, the 30 units form a sturdy, faceted 20-sided icosahedron held together solely by paper friction without tape or glue.  
* **Difficulty / Time:** Beginner to Intermediate; roughly 1–1.5 hours of repetitive folding and assembly.  
* **Tweak It:**  
  * Assemble the icosahedron using five contrasting paper colors (6 units per color) arranged in symmetrical pentagonal rings around the vertices.  
  * Insert a micro battery-powered LED fairy light cluster inside before sliding the final triangular module into place to create a geometric glowing desk lamp.  
  * Fold the units from heavy iridescent metallic craft paper or textured linen cardstock to create a durable, faceted hanging holiday ornament.

# **October 27, 2026**

# **1\. The \$1 Handheld Game Console Powered by CH32V003 & Rust (Hardware & Electronics)**

* **Source:** [CH32V003: \$1 Handheld Console — Hackaday](https://hackaday.com/tag/ch32v003/)  
* **Summary:** Maker Chris engineered an ultra-minimalist sub-\$1 handheld gaming console powered by the 10-cent WCH CH32V003 RISC-V microcontroller programmed in bare-metal Rust. Interfacing with an inexpensive 128x64 I2C OLED display, four micro tactile switches, and an internal coin cell or LiPo battery, the firmware leverages extreme memory optimizations to execute full playable arcade games within the microcontroller's tiny 2 KB of SRAM and 16 KB of flash memory.  
* **Difficulty / Time:** Advanced; roughly 4–6 hours of SMD soldering, 3D printing an enclosure, and bare-metal Rust toolchain configuration.  
* **Tweak It:**  
  * Add a miniature surface-mount piezo buzzer to play 8-bit square-wave chiptune audio effects on collisions and game-over states.  
  * Incorporate a second 10-cent CH32V003 connected via a shared single-wire bus to create a two-player wired co-op handheld link.  
  * Encase the components in a snap-together transparent PETG credit-card-sized shell that slips into a wallet.

# **2\. High-Grade Natural Beeswax Leather Balm & Conditioner (Chemistry/Kitchen Crafts)**

* **Source:** [How To Make High Grade Natural Beeswax Leather Polish — Instructables](https://www.instructables.com/How-To-Make-High-Grade-Natural-Beeswax-Leather-Pol/)  
* **Summary:** A traditional restorative material chemistry project that formulates an organic, non-toxic leather conditioner by melting natural yellow beeswax, coconut butter, sweet almond oil, and castor oil over a gentle double boiler. The balanced lipid blend penetrates deep into dry vegetable-tanned leather fibers to replace lost moisture, while the cooled beeswax creates a flexible, water-repellent barrier that buffs to a deep satin luster without petroleum solvents.  
* **Difficulty / Time:** Beginner; roughly 30 minutes active heating plus 1 hour cooling.  
* **Tweak It:**  
  * Add 5–10 drops of cedarwood and clove essential oils to provide natural anti-fungal mold resistance for conditioning vintage boots and bags.  
  * Increase the beeswax ratio from 25% to 40% to produce a stiffer, high-protection heavy-duty waterproofing wax puck for outdoor work boots.  
  * Pour the molten balm into reusable screw-top metal-free silicone or plastic tins with custom laser-printed kraft labels for gifts.

# **3\. dust: Intuitive Graphical Disk Usage Analyzer in Rust (Software & Digital)**

* **Source:** [bootandy/dust: A more intuitive version of du in rust — GitHub](https://github.com/bootandy/dust)  
* **Summary:** Developer Andy Boot created dust (du \+ rust), an open-source command-line tool written in Rust that provides a visual, glanceable overview of directory disk space consumption. Rather than scrolling through walls of unformatted text from traditional Unix du, dust parses file trees in parallel and renders sorted, color-coded ASCII horizontal bar charts directly in the terminal, instantly highlighting which subfolders and large cached files are eating up drive space.  
* **Difficulty / Time:** Beginner; roughly 5–10 minutes to install via Cargo or system package managers and set up aliases.  
* **Tweak It:**  
  * Set up a shell alias (e.g. alias du='dust \-r') to display reverse-sorted disk usage bars directly in your everyday terminal workflow.  
  * Use dust's \-d 2 flag combined with \-n 10 to generate clean, high-level storage utilization summaries for server maintenance logs.  
  * Pair dust with fzf in an interactive shell script that allows you to visually identify and delete bloated node\_modules or Docker build caches with a single keypress.

# **4\. Automated IoT Hydroponic Plant Growing System (Garden & Outdoor)**

* **Source:** [Make Your Hydroponics System Fully Automated and View Data Via IoT — Instructables](https://www.instructables.com/Make-Your-Hydroponics-System-Fully-Automated-and-V/)  
* **Summary:** An indoor automated hydroponic gardening setup that cultivates leafy greens and herbs in plastic reservoirs without soil. The maker uses agricultural rockwool cubes for seed germination, a 12V submersible DC water pump regulated by a MOSFET driver, and a microcontroller board that cycles automated nutrient water delivery on calibrated timers while streaming water levels and system uptime to an IoT dashboard.  
* **Difficulty / Time:** Intermediate; roughly 4–6 hours of reservoir plumbing, PCB soldering, and Arduino C++ firmware setup.  
* **Tweak It:**  
  * Add a digital TDS (total dissolved solids) and EC sensor probe to monitor electrical conductivity and automatically calculate when fresh nutrient powder needs replenishing.  
  * Connect a waterproof DS18B20 temperature probe to monitor nutrient reservoir water temperatures and prevent summer root rot.  
  * Run the 12V water pump and microcontroller off an external solar panel and rechargeable 12V LiFePO4 battery pack for completely off-grid indoor/patio operation.

# **5\. Mathematical Hexaflexagon: Infinite Folding Paper Mechanism (Paper & Print)**

* **Source:** [How to Make a Hexaflexagon — Instructables](https://www.instructables.com/How-to-make-a-hexaflexagon/)  
* **Summary:** A captivating mathematical paper engineering project that folds a single strip of paper containing 18 equilateral triangles into an interactive hexagonal polygon. By scoring precise alternating 60-degree mountain and valley hinges and gluing the terminal tabs together, the resulting flat paper mechanism can be continuously flexed and pinched from its center outward, rotating through an endless loop that reveals three to six completely hidden geometric faces.  
* **Difficulty / Time:** Beginner; roughly 30–45 minutes of precision scoring and folding.  
* **Tweak It:**  
  * Color-code each of the six distinct hidden states with contrasting op-art geometric designs to create a mesmerizing kinetic desk illusion.  
  * Fold the hexaflexagon from synthetic tear-proof Yupo or Tyvek sheet to allow thousands of continuous flexing cycles without hinge fatigue.  
  * Use the rotating faces as a modular six-part flashcard study tool to memorize foreign language verb conjugations or mathematical equations.  
  10. **Atuin (Software & Digital):** Replaces fragmented shell history with an encrypted, synchronized SQLite database across all terminal environments. High daily developer utility.  
  11. **Tiny E-Paper Game Boy / E-Ink Macropad (Hardware & Electronics):** Two brilliant displays of custom e-paper firmware—from high-speed 30 FPS waveform updates to dynamic context-aware desktop application macro mapping.  
  12. **Double-Decker Bucket Vermicomposter & Upside-Down Planters (Garden & Outdoor):** Practical, zero-waste gardening hacks upcycling common 5-gallon food-grade plastic buckets to maximize small-space urban food production and indoor organic composting.

# **October 28, 2026**

# **1\. Stomp Box Shoe: Wearable Piezo Acoustic Percussion (Music & Performance-Adjacent)**

* **Source:** [Stomp Box Shoe — Instructables](https://www.instructables.com/Stomp-Box-Shoe/)  
* **Summary:** Maker built a hands-free acoustic foot percussion instrument by embedding two brass piezoelectric disc transducers into the rubber sole of an everyday shoe (one under the heel for bass thumps, one under the toe for treble tap clicks). The sensors are wired directly to a 1/4-inch mono instrument jack sealed flush into the shoe\&apos;s heel cup with hot glue, allowing buskers and solo guitarists to plug into an acoustic amplifier and generate dynamic rhythmic kick and snare beats while keeping both hands on their instrument.  
* **Difficulty / Time:** Beginner; roughly 1–2 hours of careful sole carving, soldering, and glue sealing.  
* **Tweak It:**  
  * Add an inline passive 10k volume potentiometer and a high-cut capacitor switch to roll off harsh footstep scuffing and accentuate low-end bass resonance.  
  * Route the piezo signal into an Arduino or ESP32 configured as a USB MIDI drum trigger to trigger sampled 808 kick drums in a digital audio workstation.  
  * Wire a micro slide switch on the heel to toggle between parallel mono output and independent dual-channel toe/heel output for stereo drum mixing.

# **2\. Easy Woven Paracord Survival Utility Belt (Textiles & Fiber Arts)**

* **Source:** [Easy Woven Paracord Belt — Instructables](https://www.instructables.com/Easy-woven-paracord-belt/)  
* **Summary:** A rugged, functional fiber arts project that hand-weaves an adjustable everyday trouser belt from six continuous strands of 550 military-spec nylon paracord. Utilizing a continuous interlocking chevron half-hitch weave technique without needles or wooden looms, the tight knotting pattern creates a flexible, high-tensile structural band that doubles as an emergency survival reserve containing over 60 feet of deployable cordage.  
* **Difficulty / Time:** Beginner to Intermediate; roughly 3–4 hours of rhythmic hand-weaving and knot tensioning.  
* **Tweak It:**  
  * Weave with two alternating contrasting colors (e.g. olive drab and coyote brown) to create an intricate diagonal geometric V-stripe pattern.  
  * Incorporate reflective tracer paracord or glow-in-the-dark cord into the outer edge strands for nighttime visibility during camping or hiking.  
  * Finish the buckle end with a heavy-duty, metal-free acetal plastic side-release buckle with an integrated emergency whistle.

# **3\. Retro Binary Clock & Weather Station on Pi Pico W (Hardware & Electronics)**

* **Source:** [Binary Clock Also Monitors Weather — Hackaday](https://hackaday.com/blog/page/2/?s=weather)  
* **Summary:** Maker Guitarman9119 built a retro-futuristic desktop timepiece powered by a Raspberry Pi Pico W microcontroller. The board connects to local Wi-Fi to synchronize atomic time from WorldTime API and fetches local meteorological conditions from OpenWeather, driving an array of discrete front-panel LEDs that display real-time hours, minutes, and seconds in binary format, alongside a secondary OLED screen rendering human-readable temperature and weather forecasts.  
* **Difficulty / Time:** Beginner to Intermediate; roughly 2–3 hours of breadboard wiring, LED resistor calculation, and MicroPython scripting.  
* **Tweak It:**  
  * Add an onboard BME280 sensor to display real-time indoor room temperature, humidity, and barometric pressure alongside the outdoor internet forecast.  
  * Encase the components in a 3D-printed curved desktop housing with a smoked diffused PETG front bezel that gives the discrete LEDs a soft 1980s laboratory glow.  
  * Program a touch-capacitive toggle on the frame that switches the LED binary display into a dynamic binary audio visualizer when playing desktop music.

# **4\. Artisanal Homemade Marshmallows: Colloidal Sugar Foam Chemistry (Chemistry/Kitchen Crafts)**

* **Source:** [Homemade Marshmallows — Instructables](https://www.instructables.com/Homemade-Marshmallows/)  
* **Summary:** A delicious kitchen food science project exploring the creation of stabilized colloidal foams using sucrose, glucose syrup, and animal gelatin polymers. The baker cooks a sugar-honey syrup to the precise \&quot;firm ball\&quot; stage (120°C / 248°F) and slowly streams it into cold-bloomed gelatin while whipping on high speed with an electric stand mixer; whipping shears the protein strands into a micro-bubble matrix that triples in volume, sets over 10 hours in a parchment-lined pan, and cuts into pillowy, melt-in-your-mouth gourmet confection cubes.  
* **Difficulty / Time:** Beginner to Intermediate; roughly 30 minutes active cooking and whipping plus 10 hours setting time.  
* **Tweak It:**  
  * Fold in crushed freeze-dried raspberries or matcha green tea powder during the final minute of whipping to naturally color and flavor the marshmallow foam.  
  * Swap glucose syrup for dark molasses or maple syrup to impart rich, smoky caramel undertones perfect for artisan campfire s\&apos;mores.  
  * Swirl melted dark chocolate ribbons across the top of the set foam before dusting with powdered sugar and cornstarch.

# **5\. Cardboard Tabletop Foosball Soccer Game (Games & Puzzles)**

* **Source:** [Cardboard FoosBall — Instructables](https://www.instructables.com/Cardboard-FoosBall/)  
* **Summary:** A mechanical tabletop sports arcade game crafted from a recycled cardboard shipping box, plastic drinking straws, wooden-free cardstock players, and a ping-pong ball. The maker constructs reinforced rotating player rods that slide and spin across the pitch, a recessed playing field with angled corner ramps to prevent dead ball zones, and rear collection goal boxes with sliding bead counters for two-player competitive arcade action.  
* **Difficulty / Time:** Beginner; roughly 1.5–2 hours of cardboard scoring, cutting, and rod assembly.  
* **Tweak It:**  
  * Line the playing pitch floor with green felt or printed grid cardstock to dampen ball bounce and provide a smooth, fast roll surface.  
  * 3D print custom team player figures with grooved kicking feet to allow skilled ball control, passing, and bank shots.  
  * Add battery-powered micro LEDs inside the goal boxes and copper foil contact switches that flash brightly whenever a ball enters the net.

# **October 29, 2026**

# **1\. duf: Intuitive and Colorful Disk Usage/Free Utility (Software & Digital)**

* **Source:** [muesli/duf: Disk Usage/Free Utility \- a better 'df' alternative — GitHub](https://github.com/muesli/duf)  
* **Summary:** Developer Christian Muehlhaeuser (muesli) created duf, an open-source command-line tool written in Go designed as a modern, human-friendly replacement for Unix df. It automatically detects and organizes mounted devices into distinct categories (local devices, network mounts, fuse filesystems), displays beautiful color-coded horizontal progress bars showing used versus available space, supports automatic terminal resizing, and can export structured data as JSON for automated system monitoring scripts.  
* **Difficulty / Time:** Beginner; roughly 5–10 minutes to install via package managers or Go and set up aliases.  
* **Tweak It:**  
  * Set up a shell alias (e.g. alias df='duf \--all') to replace legacy df commands across all interactive SSH and terminal sessions.  
  * Pipe duf's \--json output into a lightweight Python or Bash script to trigger desktop or Telegram alerts when root partition storage exceeds 90%.  
  * Use duf's \--only local and \--hide-fs tmpfs flags in your shell profile to keep high-level storage views focused strictly on physical NVMe and SSD drives.

# **2\. CrowdClock: Distributed Self-Syncing Festival Badges via ESP-NOW (Hardware & Electronics)**

* **Source:** [Building Festival Badges That Sync Themselves Up — Hackaday](https://hackaday.com/2026/05/20/building-festival-badges-that-sync-themselves-up/)  
* **Summary:** Maker Tony Goacher designed CrowdClock, a fleet of smart interactive festival badges powered by ESP32 microcontrollers driving a ring of 16 addressable WS2812B RGB LEDs. Utilizing the connectionless ESP-NOW wireless protocol, each badge continuously broadcasts and listens for peer clock ticks; a decentralized consensus algorithm automatically syncs local timers to the highest clock value received, allowing dozens of badges in a crowded event to seamlessly synchronize dynamic light shows without Wi-Fi routers, cellular service, or central master nodes.  
* **Difficulty / Time:** Intermediate; roughly 3–5 hours across circuit wiring, 3D printing housings, and flashing ESP-IDF/Arduino code.  
* **Tweak It:**  
  * Add a miniature electret microphone and audio amplifier module to make the LED animations pulse and shift colors in sync with live festival music bass beats.  
  * Program distinct light-show color themes that spread virally through the crowd like a game of tag when two badges are held within close radio proximity.  
  * Incorporate a small LiPo charging circuit and power-saving deep sleep modes that wake the badge only when motion is detected by an onboard tilt sensor.

# **3\. Origami Lotus Flower: Traditional Kinetic Blintz-Fold Bloom (Paper & Print)**

* **Source:** [Origami \- Lotus Flower — Instructables](https://www.instructables.com/Origami-Lotus-Flower-2/)  
* **Summary:** A traditional Japanese paper-folding project that sculpts a dimensional blooming water lily from a single square sheet of origami paper or fabric napkin. By executing repeated blintz folds (folding all four corners symmetrically to the center on alternating sides) and gently inverting the underlying petal flaps upward over the folded creases, the paper naturally expands into a multi-layered, delicate three-dimensional lotus blossom without scissors, tape, or glue.  
* **Difficulty / Time:** Beginner; roughly 15–20 minutes of careful folding and petal inverting.  
* **Tweak It:**  
  * Fold the flower from water-resistant wax paper or parchment to float the finished origami lotus in a decorative outdoor birdbath or water bowl.  
  * Place a battery-powered micro LED tea light inside the center cupped petals to turn the blossom into an atmospheric tabletop luminary.  
  * Use two-sided duotone origami paper (e.g. pink on front, soft green on back) so the inverted petal leaves reveal natural contrasting foliage beneath the blossom.

# **4\. Budget Vertical Planter Wall from Recycled Plastic Containers (Garden & Outdoor)**

* **Source:** [Vertical Planter Wall for Under \$10 — Instructables](https://www.instructables.com/Vertical-planter-wall-for-under-10/)  
* **Summary:** A high-density urban gardening project that constructs an outdoor living green wall using recycled plastic utility bins or 2-liter soda bottles mounted directly to a sunny patio or balcony wall. Each plastic container is modified with offset drainage holes and a bottom gravel water reservoir to prevent root rot while allowing overflow moisture to cascade down to lower planting tiers, providing abundant root space for culinary herbs, strawberries, and pollinator flowers in cramped outdoor spaces.  
* **Difficulty / Time:** Beginner; roughly 1 hour of measuring, perforating, and wall mounting.  
* **Tweak It:**  
  * Paint the exterior of the plastic bins with UV-resistant light-colored acrylic spray paint to protect the plastic from sun brittleness and keep plant roots cool.  
  * Route a central 1/4-inch micro-drip irrigation tube with adjustable emitters across the top tier to automate watering from a simple hose timer.  
  * Plant cascading trailing varieties like creeping thyme and nasturtiums along the upper tiers to naturally drape over the containers and create a lush living curtain.

# **5\. Heavy-Duty Paracord Camera Neck Strap (Textiles & Fiber Arts)**

* **Source:** [Paracord Camera Neck Strap — Instructables](https://www.instructables.com/Paracord-camera-neck-strap/)  
* **Summary:** A durable, utilitarian fiber craft project that hand-weaves a rugged camera carrying strap using two 18-foot lengths of 550 military-spec nylon paracord. The maker weaves a wide, flat Solomon bar (cobra stitch) around twin continuous core strands, providing a comfortable load-distributing shoulder pad that attaches to camera lugs with split rings and heavy-duty nylon webbing without bulky sewing machines or leather punches.  
* **Difficulty / Time:** Beginner to Intermediate; roughly 1.5–2 hours of continuous knotting and tensioning.  
* **Tweak It:**  
  * Integrate quick-release plastic side-squeeze buckles near each camera attachment point to allow instant switching between a neck strap and a wrist lanyard.  
  * Weave with two contrasting colors (e.g. matte black and olive drab) to produce an intricate centered two-tone stripe along the length of the strap.  
  * Incorporate a small concealed elastic loop along the weave to hold a camera lens cap or spare SD memory card while shooting.

# **October 30, 2026**

# **1\. DIY Digital Barograph: ESP32 Atmospheric Pressure Monitor (Hardware & Electronics)**

* **Source:** [DIY Digital Barograph Offers Modern Twist on Classic Technology — Hackaday](https://hackaday.com/tag/bme280/)  
* **Summary:** Maker mircmk built a modern digital barograph that replaces traditional mechanical paper-drum barometers with an ESP32 microcontroller, a Bosch BME280 precision sensor, and a 128x64 graphic LCD screen. The system samples barometric pressure, ambient temperature, and relative humidity, rendering rolling real-time atmospheric pressure trend graphs over 1-hour and 3-hour windows to accurately predict storm fronts and barometric drops before weather shifts occur.  
* **Difficulty / Time:** Intermediate; roughly 2–3 hours across breadboard wiring, LCD interface setup, and Arduino C++ firmware flashing.  
* **Tweak It:**  
  * Add an onboard micro SD card breakout board to log historical weather data at 1-minute intervals as CSV files for long-term climate analysis.  
  * Implement an audible piezoelectric buzzer alarm that triggers if barometric pressure drops faster than 2 hPa in under three hours, signaling an approaching gale.  
  * Swap the 128x64 LCD for a low-power 2.9-inch electronic paper display to run the unit for months off a small 18650 rechargeable Li-ion cell.

# **2\. Capacitive Clothespin Piano Keyboard for iPad (Music & Performance-Adjacent)**

* **Source:** [Make A Capacitive Clothespin Keyboard For Your IPad — Hackaday](https://hackaday.com/2014/11/07/make-a-capacitive-clothespin-keyboard-for-your-ipad/)  
* **Summary:** Maker Adam Kumpf built a mechanical acoustic piano keyboard interface designed to physically actuate musical synthesizer apps on an iPad without electronics or batteries. By mounting spring-loaded clothespins onto a cardboard chassis with rubber bands rocking over a central pencil fulcrum, pressing down on the front key causes the rear pin to strike the tablet's capacitive screen via conductive aluminum foil hammer pads, providing authentic piano-hammer tactile feedback for digital music apps.  
* **Difficulty / Time:** Beginner; roughly 1 hour of measuring, cardboard cutting, and rubber-band tensioning.  
* **Tweak It:**  
  * Line the underside of each clothespin hammer with conductive velvet or foam to soften acoustic clicking sounds on the glass screen.  
  * Build a two-octave 24-key frame with staggered black and white painted keys to play chromatic scales and full chords.  
  * Replace the iPad contact foil with miniature copper touch pads wired to an Arduino configured as a USB MIDI keyboard for desktop DAWs.

# **3\. Origami Firework: Infinite Kinetic Rotating Modular Ring (Paper & Print)**

* **Source:** [Origami Firework \- Yami Yamauchi — Instructables](https://www.instructables.com/Origami-Firework-Yami-Yamauchi/)  
* **Summary:** A captivating kinetic paper sculpture designed by Yami Yamauchi, folded from 12 identical diamond-creased modular units of square origami paper. The folded units interweave without tape, glue, or scissors into a continuous flexible torus ring that rotates smoothly from its center outward, tumbling through an endless cycle of dynamic geometric color changes and blooming floral forms.  
* **Difficulty / Time:** Intermediate; roughly 1–1.5 hours of precise pre-creasing and modular ring assembly.  
* **Tweak It:**  
  * Fold the units from 12 distinct contrasting paper colors arranged in a color wheel sequence (red, orange, yellow, green, blue, purple) to create a hypnotic rainbow optical illusion as it rotates.  
  * Fold from heavy metallic craft foil paper or synthetic tear-resistant Tyvek to ensure the mechanical paper hinges endure thousands of rotations without creasing fatigue.  
  * Scale up the starting paper squares to 20cm cardstock to create a large kinetic centerpiece or tabletop fidget sculpture.

# **4\. Natural Fruit Juice Gummies with Gelatin Hydrogel (Chemistry/Kitchen Crafts)**

* **Source:** [Quick and Easy Gummies — Instructables](https://www.instructables.com/Quick-and-easy-gummies/)  
* **Summary:** A beginner-friendly culinary chemistry project exploring protein hydrogel crosslinking using unflavored gelatin, natural fruit juices, and citric acid. Gently heating the fruit juice and gelatin in a saucepan denatures the triple-helix collagen protein chains; once poured into flexible silicone novelty molds and chilled, the protein strands reassemble into a dense, water-trapping elastic polymer network that unmolds into chewy, preservative-free gourmet gummy candies.  
* **Difficulty / Time:** Beginner; roughly 20 minutes active prep plus 15 minutes chilling.  
* **Tweak It:**  
  * Add a pinch of citric acid and fine sugar coating to the unmolded gummies to create tart, mouth-puckering sour candies.  
  * Substitute animal gelatin with agar-agar (red seaweed polysaccharide) at a 1:4 ratio to formulate 100% plant-based vegan fruit jellies with a firmer bite.  
  * Layer alternating colors (such as blueberry juice and mango purée) into molds with 5-minute freeze intervals between pours to produce vibrant multi-layered gummy treats.

# **5\. Makedo Kinetic Marble Run from Upcycled Cartons & Tubes (Games & Puzzles)**

* **Source:** [Makedo Marble Run — Instructables](https://www.instructables.com/Makedo-Marble-Run/)  
* **Summary:** An interactive mechanical marble run and gravity maze constructed entirely from recycled paper milk cartons, halved paper towel tubes, and cardboard connectors. The maker cuts staggered entry and exit ports into cardboard carton towers of varying heights, connects inclined paper chute pathways using reusable clips and hinges, and tests marble velocity and gravity drop angles to guide rolling marbles through continuous zigzag runs without plastic or wooden kits.  
* **Difficulty / Time:** Beginner; roughly 1–2 hours of carton cutting, tube slitting, and angle tuning.  
* **Tweak It:**  
  * Incorporate a cardboard funnel vortex or spiral paper bowl along the path where marbles spin in concentric orbits before dropping into the next chute.  
  * Add miniature cardstock swinging gates and chime bells triggered by the weight of passing marbles to introduce auditory feedback.  
  * Build a vertical cardboard elevator lift using a hand-cranked paper belt with glued carton scoops to return marbles automatically back to the top tower.

# **October 31, 2026**

# **1\. btop: High-Performance Graphical Terminal Resource Monitor (Software & Digital)**

* **Source:** [aristocratos/btop: A monitor of resources — GitHub](https://github.com/aristocratos/btop)  
* **Summary:** Developer Jakob P. Liljenberg (aristocratos) built btop, an open-source terminal system monitor written in C++ that visualizes CPU core frequencies, memory allocation, storage disk activity, network throughput, and active processes with smooth responsive braille graphs. Supporting full mouse navigation, dynamic scaling, tree views, and custom 24-bit Truecolor themes, it delivers deep system diagnostics in a single lightweight terminal process.  
* **Difficulty / Time:** Beginner; roughly 5–10 minutes to install via Cargo, package managers, or homebrew.  
* **Tweak It:**  
  * Create a custom color theme in \~/.config/btop/themes/ to match your desktop environment's Catppuccin or Nord color scheme.  
  * Configure btop to monitor NVIDIA or AMD GPU temperatures, VRAM, and clock speeds directly on dedicated hardware-monitoring screens.  
  * Map keyboard shortcuts to instantly send SIGKILL or SIGTERM signals to runaway processes without leaving the terminal view.

# **2\. Crochet Reusable Water Bottle Sling Holder (Textiles & Fiber Arts)**

* **Source:** [Crochet a Water Bottle Holder to Match Your Style\! — Instructables](https://www.instructables.com/Crochet-a-Water-Bottle-Holder-to-Match-Your-Style/)  
* **Summary:** A practical fiber craft project that crochets an everyday hands-free carrying sling for reusable water bottles using worsted weight cotton yarn and a 4.5mm crochet hook. The maker works a flat circular base in increasing double crochet rounds, transitions into an expandable open mesh diamond net stitch up the bottle body, and finishes with a sturdy, reinforced cross-body shoulder strap.  
* **Difficulty / Time:** Beginner; roughly 1.5–2 hours of rhythmic circular crochet.  
* **Tweak It:**  
  * Add a small external crochet slip pocket along the upper strap to securely hold lip balm, keys, or AirPods.  
  * Work with two contrasting colors in alternating rows to create a spiral diagonal helix stripe along the mesh walls.  
  * Use heavy-duty macrame paracord or hemp cord to make the holder completely waterproof and rot-resistant for outdoor hikes.

# **3\. DIY Lay-Flat Blank Journal with Exposed Coptic Stitch (Paper & Print)**

* **Source:** [DIY Journals & Book Binding — Instructables](https://www.instructables.com/DIY-Journals-Book-Binding/)  
* **Summary:** A traditional hand-bookbinding craft project that binds multiple folded paper signatures into a lay-flat blank artist sketchbook using exposed Coptic chain stitch across the spine. Stiff paper chipboard covers are wrapped in decorative marbled paper, and heavy-gauge waxed linen thread is sewn through five pre-punched spine stations, looping beneath adjacent signature threads to produce an interlocking braided chain spine that opens a full 360 degrees without cracking glue.  
* **Difficulty / Time:** Beginner to Intermediate; roughly 2–3 hours of signature folding, pre-punching, and chain-sewing.  
* **Tweak It:**  
  * Interleave alternating signatures of dotted grid paper and heavy 300gsm watercolor paper to create a versatile multi-medium creative journal.  
  * Thread miniature wooden beads or brass charms into the exposed spine loops during the sewing process for an ornamental visual accent.  
  * Attach a wide elastic ribbon band recessed into the back cover board to hold the sketchbook securely closed in a backpack.

# **4\. Teaching a Raspberry Pi Pico E-Paper Display New Tricks (Hardware & Electronics)**

* **Source:** [Teaching A Pi Pico E-Ink Panel New Tricks — Hackaday](https://hackaday.com/2024/11/08/teaching-a-pi-pico-e-ink-panel-new-tricks/)  
* **Summary:** Maker hooked an electronic paper panel to a Raspberry Pi Pico (RP2040) utilizing custom MicroPython drivers and Floyd-Steinberg error-diffusion dithering algorithms. By optimizing display buffer memory footprints, the RP2040 renders crisp 1-bit high-contrast grayscale photos, dynamic calendar text, and sensor telemetry directly onto the reflective e-paper panel without motion ghosting, holding displayed information indefinitely with zero quiescent power consumption.  
* **Difficulty / Time:** Intermediate; roughly 2–3 hours of SPI wiring, MicroPython firmware flashing, and image conversion pipeline setup.  
* **Tweak It:**  
  * Connect an external DS3231 real-time clock (RTC) module to update the display once an hour, putting the Pico into deep sleep between refreshes to run for over a year on a single coin cell.  
  * Add a DHT22 or BME280 sensor to display room temperature and humidity alongside calendar reminders on your desk.  
  * Encase the board and e-ink display in a snap-together 3D-printed desktop easel frame with a front bezel that conceals the ribbon cable.

# **5\. Upcycled Clamshell Egg Carton Mini Greenhouse (Garden & Outdoor)**

* **Source:** [Mini Greenhouse With Plastic Egg Carton — Instructables](https://www.instructables.com/Mini-greenhouse-with-plastic-egg-carton/)  
* **Summary:** A zero-cost seed germination hack that repurposes a clear plastic clamshell egg carton into a self-contained indoor seedling incubator. The maker punctures fine drainage holes through each individual egg cup, nests the cup tray into the solid inverted lid to catch excess drainage water, fills the cells with potting soil and seeds, and snaps the transparent domed cover shut to create an airtight mini greenhouse that traps solar warmth and moisture on a windowsill.  
* **Difficulty / Time:** Beginner; roughly 10–15 minutes of perforating, soil filling, and planting.  
* **Tweak It:**  
  * Poke adjustable vent holes in the transparent top dome using a heated needle to regulate internal humidity and prevent mold as seedlings sprout.  
  * Line each egg cup with a strip of unbleached newsprint or coffee filter paper so delicate root balls can be lifted out effortlessly during garden bed transplanting.  
  * Set the closed plastic container on top of a warm appliance (like a refrigerator or desktop router) to provide gentle bottom heat that accelerates seed germination.

# **November 1, 2026**

# **1\. Natural Beeswax and Sweet Almond Oil Solid Perfume (Chemistry/Kitchen Crafts)**

* **Source:** [Solid Perfume — Instructables](https://www.instructables.com/Solid-Perfume/)  
* **Summary:** An accessible cosmetic chemistry craft formulating solid, pocket-sized aromatherapeutic perfumes by melting unrefined yellow beeswax pellets and sweet almond oil in a 1:1 ratio over gentle heat. Once liquefied, custom essential oil scent profiles (such as cedarwood, bergamot, and lavender) are blended into the molten lipid carrier, which is poured into small metal-free plastic screw-top pocket tins or twist-up tubes where it sets within thirty minutes into an alcohol-free, melt-on-skin solid cologne.  
* **Difficulty / Time:** Beginner; roughly 20–30 minutes active prep and cooling.  
* **Tweak It:**  
  * Fold in 5% refined shea butter or cocoa butter to soften the wax firmness and provide extra skin-nourishing moisturization.  
  * Infuse the liquid almond oil beforehand with dried rose petals or vanilla beans over low heat to add deep, warm botanical base notes.  
  * Pour the molten wax into empty, cleaned twist-up lip balm tubes for convenient, mess-free travel application on wrists and pulse points.

# **2\. Compose Any Song with Twelve Buttons on Adafruit MacroPad (Music & Performance-Adjacent)**

* **Source:** [Compose Any Song With Twelve Buttons — Hackaday](https://hackaday.com/2023/03/29/compose-any-song-with-twelve-buttons/)  
* **Summary:** Maker DeckerEgo built a standalone musical composition controller powered by an Adafruit RP2040 MacroPad. By mapping musical scale algorithms and chord progressions into CircuitPython, the 12 mechanical keys allow a musician to compose complex multi-track melodies, chord progressions, and looped drum patterns into a connected DAW with OLED visual feedback.  
* **Difficulty / Time:** Intermediate; roughly 2–3 hours of CircuitPython scripting and MIDI mapping.  
* **Tweak It:**  
  * Program rotary encoder navigation to dynamically switch musical scale modes (Dorian, Mixolydian, blues pentatonic) on the fly during live performance.  
  * Integrate an external piezo buzzer or mini speaker directly to the board's DAC output for standalone audio playback without a computer DAW host.  
  * Add per-key RGB lighting animations that illuminate harmonic chords and scales across the key matrix as you play.

# **3\. Kumihimo Braiding Disk from Upcycled Cardboard (Textiles & Fiber Arts)**

* **Source:** [Make Your Own Kumihimo Braiding Disk \+ Learn the Basics — Instructables](https://www.instructables.com/Make-Your-Own-Kumihimo-Braiding-Disk-Learn-the-Bas/)  
* **Summary:** An ancient Japanese fiber arts technique (Kumihimo) where a handheld circular disc made from recycled corrugated cardboard or craft foam is used to weave dense, decorative structural cords. By cutting eight peripheral tension slots and a central aperture, seven working strands of cotton embroidery floss or yarn are sequentially shifted across the notches in a rhythmic clockwise sequence, forming an intricate, round tubular braid without requiring wooden marudai stands or bobbins.  
* **Difficulty / Time:** Beginner; roughly 1–2 hours of rhythmic hand-braiding.  
* **Tweak It:**  
  * Thread seed beads or metallic spacers onto the outer strands to interweave shimmering bead rows along the spiraling braid ridge.  
  * Use high-tensile 550 military paracord strands to produce a rugged round survival lanyard or camera wrist strap.  
  * Scale up from eight to sixteen slots to braid complex multi-color spiral patterns and flat structural ribbons.

# **4\. DIY Cardboard Tabletop Air Hockey Game with Blower Fan (Games & Puzzles)**

* **Source:** [DIY: AIR HOCKEY — Instructables](https://www.instructables.com/DIY-AIR-HOCKEY/)  
* **Summary:** A mechanical tabletop arcade game constructed from heavy-duty corrugated cardboard sheets, plastic drinking straws, and a 12V DC computer cooling fan. The maker perforates hundreds of uniform pinholes across a raised cardboard playing pitch and mounts the fan inside a sealed plenum chamber beneath; turning on the fan forces a continuous cushion of pressurized air through the surface holes, allowing lightweight plastic pucks to glide with near-zero friction into goal slots for two-player competitive arcade matches.  
* **Difficulty / Time:** Intermediate; roughly 3–4 hours of cardboard cutting, hole grid perforating, and fan wiring.  
* **Tweak It:**  
  * Wire a slide switch or potentiometer to the fan's 12V power supply to adjust air pressure velocity for heavy or ultralight pucks.  
  * 3D print custom ergonomic striker handles (mallets) with soft felt slider bases to enhance grip and prevent surface scuffing.  
  * Add micro limit switches inside each goal box wired to an Arduino and 7-segment display to automatically tally points and trigger victory fanfare sounds.

# **5\. lazygit: Simple Terminal UI for Git Commands in Go (Software & Digital)**

* **Source:** [jesseduffield/lazygit: simple terminal UI for git commands — GitHub](https://github.com/jesseduffield/lazygit)  
* **Summary:** Developer Jesse Duffield created lazygit, an acclaimed open-source terminal user interface for Git written in Go. Designed to make terminal version control effortless, it enables developers to navigate branches, stage individual hunks, resolve merge conflicts, view visual commit graph diffs, and perform complex interactive rebases with intuitive single-key shortcuts directly in the terminal.  
* **Difficulty / Time:** Beginner; roughly 5–10 minutes to install via package managers or Go and set up aliases.  
* **Tweak It:**  
  * Set up a global shell alias (e.g. alias lg='lazygit') to invoke the interactive interface instantly from any active project directory.  
  * Customize lazygit's YAML configuration file (\~/.config/lazygit/config.yml) with bespoke keybindings and custom Git commands like automated conventional commit formatters.  
  * Integrate lazygit inside Neovim or tmux to launch an overlay Git management popup without leaving your active code editing buffer.

# **Weekly Roundup — October 26 – November 1, 2026**

* **Total Projects Found:** 35 projects documented over the past 7 days across 7 daily runs.  
* **Categories Represented:**  
  * Software & Digital (zoxide, dust, duf, btop, lazygit)  
  * Hardware & Electronics (CH32V003 \$1 Game Console, Pi Pico W Binary Weather Clock, CrowdClock Festival Badges, Pi Pico E-Paper Tricks)  
  * Music & Performance-Adjacent (Unmodded GBA Synth, Stomp Box Shoe, Clothespin iPad Piano, MacroPad 12-Button Composer)  
  * Textiles & Fiber Arts (Macrame Wall Hanging, Woven Paracord Belt, Paracord Camera Strap, Crochet Bottle Holder, Cardboard Kumihimo Braiding)  
  * Games & Puzzles (Cardboard Steampunk Geared Box, Cardboard Foosball, Makedo Marble Run, Tabletop Cardboard Air Hockey)  
  * Paper & Print (Post-It Origami Icosahedron, Mathematical Hexaflexagon, Origami Lotus Flower, Origami Firework Ring, Coptic Stitch Blank Journal)  
  * Chemistry/Kitchen Crafts (Beeswax Leather Conditioner, Artisanal Marshmallows, Gelatin Fruit Gummies, Beeswax Solid Perfume)  
  * Garden & Outdoor (IoT Hydroponic System, Budget Vertical Planter Wall, Clamshell Egg Carton Mini Greenhouse)  
* **Top Projects Worth Revisiting or Building:**  
  13. **lazygit & zoxide (Software & Digital):** Essential terminal workflow utilities in Go and Rust that transform everyday Git staging, conflict resolution, and shell navigation into instantaneous single-keystroke actions.  
  14. **CrowdClock & CH32V003 Game Console (Hardware & Electronics):** Highlights the exciting frontier of ultra-low-cost and decentralized hardware—from sub-\$1 bare-metal Rust gaming on a 10-cent chip to connectionless peer-to-peer LED synchronization across festival crowds.  
  15. **Tabletop Cardboard Air Hockey & Foosball (Games & Puzzles):** Clever mechanical arcade engineering proving that recycled corrugated cardboard, rubber bands, and a 12V PC cooling fan can replicate genuine arcade physics at zero cost.

# **November 2, 2026**

# **1\. Solar-Powered Supercapacitor Portable Speaker (Hardware & Electronics)**

* **Source:** [Building A Solar-Powered, Supercapacitor-Based Speaker — Hackaday](https://hackaday.com/tag/super-capacitor/)  
* **Summary:** Maker JGJMatt engineered an ultra-durable outdoor portable audio speaker powered by an eco-friendly supercapacitor bank instead of standard lithium-ion batteries. Housed inside a 3D-printed PETG enclosure with a flexible TPU passive bass radiator, the device integrates a high-efficiency top solar panel, an analog audio input jack, and a TPA2301D1 amplifier paired with an internal boost converter that extracts continuous audio output across a wide 1.8V to 5.5V capacitor discharge curve, providing up to six hours of daytime playback with virtually zero battery degradation over decades.  
* **Difficulty / Time:** Intermediate; roughly 4–6 hours across 3D printing, circuit soldering, and power management testing.  
* **Tweak It:**  
  * Add a plug-and-play Bluetooth 5.0 audio receiver module powered directly off the regulated 5V boost line to enable wireless streaming from smartphones.  
  * Incorporate a multi-stage LED bar graph display to visually monitor capacitor charge state in real time.  
  * Install a secondary USB-C fast-charging input port so the supercapacitor bank can be topped off from a wall charger in under five minutes on cloudy days.

# **2\. Square Interlace Geometric Origami Tessellation (Paper & Print)**

* **Source:** [The Process of Making an Origami Tessellation — Instructables](https://www.instructables.com/The-Process-of-Making-an-Origami-Tessellation/)  
* **Summary:** A captivating geometric paper engineering project designed by Michał Kosmulski that folds the "Square Interlace" tessellation from a single uncut sheet of heavy origami paper. The maker pre-creases an intricate 32x32 diagonal square grid, then systematically collapses alternating central square twists and four corner inside-reverse folds along intersecting valley lines, forming an interlocking relief pattern with rich tactile dimensionality and optical depth.  
* **Difficulty / Time:** Advanced; roughly 2–3 hours of patient grid pre-creasing and careful structural collapsing.  
* **Tweak It:**  
  * Fold the tessellation from translucent parchment or tracing paper and mount it over a backlit LED frame to create an architectural geometric light panel.  
  * Scale up the starting paper to a 64x64 grid to repeat the interlace motif sixteen times across a large single sheet.  
  * Spray the finished folded paper lightly with a matte clear acrylic sealer to preserve fold crispness and prevent humidity from relaxing the geometric pleats.

# **3\. Single Dutch Bucket Recirculating Hydroponic System (Garden & Outdoor)**

* **Source:** [Single Dutch Bucket Hydroponic System — Instructables](https://www.instructables.com/Single-Dutch-Bucket-Hydroponic-Tomato-System/)  
* **Summary:** A high-yield patio hydroponics project that transforms a standard 5-gallon food-grade plastic bucket into a recirculating Dutch bucket (Bato bucket) for growing large vining plants like tomatoes and cucumbers. The bucket is filled with coarse perlite and expanded clay pebbles, equipped with a bottom siphon elbow pipe that maintains an internal 2-inch nutrient reservoir, and fed via a 1/4-inch drip irrigation line connected to a small submersible pump inside a lower plastic storage tote.  
* **Difficulty / Time:** Beginner to Intermediate; roughly 1.5–2 hours of bucket drilling, siphon fitting, and pump plumbing.  
* **Tweak It:**  
  * Chain three to five buckets together along a single 1.5-inch PVC drain manifold to create a high-capacity balcony vegetable garden powered by one central pump.  
  * Connect the submersible pump to an automated cycle timer plug set to irrigate for 15 minutes every two hours to maximize root oxygenation.  
  * Add a float-valve auto-top-off mechanism to the main reservoir connected to a rain barrel to keep nutrient solution levels constant during hot summer weeks.

# **4\. Paracord Watch Band with Mated Snake Knots (Textiles & Fiber Arts)**

* **Source:** [How to Create a Paracord Watch Band — Instructables](https://www.instructables.com/How-to-create-a-paracord-watch-band/)  
* **Summary:** A rugged, custom-fitted wristwatch strap hand-woven from two lengths of 550 military-spec nylon paracord using a continuous mated snake knot technique. The maker anchors core strands through watch case spring bars and a curved plastic side-release buckle with cow hitch knots, then interlaces alternating cord loops along both edges to construct a flexible, moisture-resistant band that distributes wrist weight comfortably without metal buckles or sewing.  
* **Difficulty / Time:** Beginner; roughly 1–1.5 hours of measuring, knotting, and heat-sealing.  
* **Tweak It:**  
  * Interweave two contrasting colors (such as desert tan and charcoal gray) to create a centered two-tone geometric diamond braid down the wrist.  
  * Incorporate a miniature compass bead or emergency ferrocerium fire-striker rod directly into the buckle hardware for outdoor bushcraft utility.  
  * Use micro-cord (Type I paracord) instead of 550 cord to braid a slimmer, low-profile strap suitable for dress watches or fitness trackers.

# **5\. DIY Effervescent Moisturizing Bath Bombs (Chemistry/Kitchen Crafts)**

* **Source:** [DIY Moisturizing Bath Bombs — Instructables](https://www.instructables.com/DIY-Moisturizing-Bath-Bombs/)  
* **Summary:** A relaxing cosmetic chemistry craft exploring solid-state acid-base neutralization reactions using sodium bicarbonate (baking soda) and powdered citric acid in a 2:1 stoichiometric ratio. Blended with Epsom salts, skin-nourishing melted coconut oil, and pure essential oils, the dry mixture is lightly spritzed with water until it clumps like damp beach sand, tightly packed into two-piece spherical plastic molds, and dried for 24 hours into dense, effervescent bath spheres that release soothing carbon dioxide bubbles upon contact with warm water.  
* **Difficulty / Time:** Beginner; roughly 30 minutes active blending and molding plus 24 hours cure time.  
* **Tweak It:**  
  * Fold in dried botanical petals (such as lavender buds or crushed calendula) around the mold rim to create an artisanal spa aesthetic when dropped into water.  
  * Add a tablespoon of kaolin clay or colloidal oatmeal to the dry mix to create a silky, milky bath soak that relieves dry winter skin.  
  * Layer contrasting colored powders (tinted with natural mica powder or beet root powder) to produce swirling multi-colored bath art.

# **November 3, 2026**

# **1\. fd: Fast and User-Friendly Terminal Alternative to find (Software & Digital)**

* **Source:** [sharkdp/fd: A simple, fast and user-friendly alternative to 'find' — GitHub](https://github.com/sharkdp/fd)  
* **Summary:** Developer David Peter (sharkdp) created fd, an open-source command-line tool written in Rust designed as a modern, intuitive replacement for Unix find. It features colorized terminal output, parallelized directory traversal, automatic .gitignore parsing, regex and glob matching by default, and simple syntax (e.g. typing "fd pattern" instead of "find . \-iname '\*pattern\*'"), dramatically speeding up filesystem searches for developers.  
* **Difficulty / Time:** Beginner; roughly 5–10 minutes to install via Cargo or system package managers and set up aliases.  
* **Tweak It:**  
  * Set up a shell alias (e.g. alias find='fd') to make fd your default filesystem search utility across all interactive terminal workflows.  
  * Use fd's \-x or \--exec flag to run batch operations in parallel across matching files (such as converting image formats or linting code files).  
  * Integrate fd with fzf as the default directory search engine to enable instantaneous interactive fuzzy file searching.

# **2\. Stylish\! An Expressive Stylophone Synthesizer (Music & Performance-Adjacent)**

* **Source:** [Stylophone — Hackaday](https://hackaday.com/tag/stylophone/)  
* **Summary:** Maker Tim Trzepacz engineered "Stylish\!", an expressive portable electronic musical instrument based on the classic Stylophone concept. It features a custom PCB keyboard trace interface played with a wired stylus, addressable LED status feedback, an internal speaker with amplifier, headphone outputs, and advanced onboard multi-waveform sound synthesis modes with battery power in a 3D-printed enclosure.  
* **Difficulty / Time:** Intermediate; roughly 3–4 hours of PCB soldering, 3D printing an enclosure, and flashing synthesizer firmware.  
* **Tweak It:**  
  * Add a 10k rotary potentiometer to modulate filter cutoff or LFO vibrato depth dynamically while playing notes with the stylus.  
  * Route audio line output through an onboard 3.5mm stereo jack directly into a guitar delay or overdrive pedal for rich acoustic textures.  
  * Reprogram the microcontroller with custom scales (such as pentatonic minor or microtonal Arabian scales) to play exotic musical modes without chromatic errors.

# **3\. Tower Takedown: Tabletop Board Game with 3D-Printed Pieces (Games & Puzzles)**

* **Source:** [Tower Takedown, the Board Game — Instructables](https://www.instructables.com/Tower-Takedown-the-Board-Game/)  
* **Summary:** Maker designed "Tower Takedown", an original tabletop strategy board game constructed using a 15x15-inch cardboard game board, printed card decks and play money, and custom 3D-printed modular tower platforms, bricks, sabotage balls, and player meeples. Players roll dice, manage construction budgets, and strategically balance physical tower tiers while deploying sabotage cards and balls to knock down opponents' structures.  
* **Difficulty / Time:** Beginner to Intermediate; roughly 2 hours of board scoring and card cutting plus 6–8 hours 3D print time.  
* **Tweak It:**  
  * Print the modular tower platforms in contrasting dual-color filaments with numbered notches to easily track building tier heights.  
  * Mount the cardboard game board onto heavy 2mm chipboard with cloth-tape hinges so it folds into quarters to fit inside a compact travel box.  
  * Add customized sabotage challenge cards introducing randomized weather hazards like earthquakes and windstorms that force players to re-engineer tower balance.

# **4\. Kirigami Geometric Stairs Pop-Up Card Architecture (Paper & Print)**

* **Source:** [How to Make a Kirigami Pop Up Card — Instructables](https://www.instructables.com/How-to-Make-a-Kirigami-Pop-Up-Card/)  
* **Summary:** A geometric paper engineering craft that transforms a single sheet of heavy cardstock into an intricate architectural pop-up structure using the Japanese art of kirigami (cutting and folding). By measuring and executing precise parallel slit cuts and alternating 90-degree mountain and valley creases, opening the card causes the flat sheet to tension outward into an ascending, multi-tiered geometric staircase diorama without adhesive, tape, or secondary hinges.  
* **Difficulty / Time:** Beginner; roughly 30–45 minutes of precision scoring, cutting, and folding.  
* **Tweak It:**  
  * Layer a sheet of contrasting dark cardstock behind the white stairs so ambient light casts dramatic architectural drop shadows through the open risers.  
  * Scale up the blueprint onto 300gsm watercolor paper and paint subtle watercolor gradients along each step tread before folding.  
  * Cut miniature silhouette figures or doors on the stair landings to turn the geometric card into an interactive storybook illustration.

# **5\. Moon on Your Desk: ESP32-S3 Astronomical Lunar Clock (Hardware & Electronics)**

* **Source:** [Put The Moon On Your Desk — Hackaday](https://hackaday.com/2026/05/20/put-the-moon-on-your-desk/)  
* **Summary:** Maker Karsten created a real-time astronomical desktop clock powered by an ESP32-S3 microcontroller and a 2.1-inch circular IPS color display inside a sleek 3D-printed enclosure. The firmware calculates continuous astronomical orbital algorithms based on local time and GPS coordinates (latitude and longitude), rendering high-resolution photorealistic lunar imagery from NASA that precisely mimics current moon phase, libration wobble, and illumination angle as seen from your exact location on Earth.  
* **Difficulty / Time:** Intermediate; roughly 3–4 hours of circuit assembly, 3D printing, and Arduino/ESP-IDF firmware flashing.  
* **Tweak It:**  
  * Add touch-screen controls or a rotary encoder to fast-forward through lunar calendar phases across upcoming weeks and eclipse dates.  
  * Pull local cloud cover and weather metrics via Wi-Fi from OpenWeather to dim the display automatically when the real moon is obscured by overcast skies.  
  * Incorporate a small LiPo battery charging module inside the base to make the lunar clock an autonomous cord-free nightstand companion.

# **November 4, 2026**

# **1\. Glow: Render Markdown on the CLI with Pizzazz (Software & Digital)**

* **Source:** [charmbracelet/glow: Render markdown on the CLI, with pizzazz\! — GitHub](https://github.com/charmbracelet/glow)  
* **Summary:** Developer Charm created glow, an open-source terminal-based markdown reader and document organizer written in Go using the Bubble Tea TUI framework. It discovers local markdown files in project repositories or note directories, renders them with gorgeous terminal typography, syntax-highlighted code fences, and colorized tables, and offers an interactive terminal user interface (TUI) for browsing, searching, and reading technical documentation directly in the console.  
* **Difficulty / Time:** Beginner; roughly 5–10 minutes to install via package managers or Go and set up shell aliases.  
* **Tweak It:**  
  * Set up a custom pager alias in your shell configuration (e.g. alias md='glow \-p') to paginate long project README files and study guides interactively.  
  * Configure a custom theme in \~/.config/glow/ to synchronize heading accents and code block styling with your terminal emulator palette.  
  * Pipe output from web CLI tools or API curl requests directly into glow for instant terminal formatting.

# **2\. Classic Modular Crochet Granny Square (Textiles & Fiber Arts)**

* **Source:** [How to Crochet a Granny Square — Instructables](https://www.instructables.com/How-to-Crochet-a-Granny-Square/)  
* **Summary:** A foundational fiber arts project that crochets the classic modular "granny square" from worsted weight yarn using a size G/H (4.5mm) crochet hook. Starting from an initial chain-4 slipknot ring, the crafter works outward in concentric square rounds composed of three-double-crochet cluster "shells" separated by corner chain spaces, forming a flat, durable geometric textile block that can be joined into blankets, coasters, or tote bags.  
* **Difficulty / Time:** Beginner; roughly 20–30 minutes per square block.  
* **Tweak It:**  
  * Swap yarn colors at each concentric round to create a vibrant retro multi-color flowerburst motif from leftover yarn scraps.  
  * Join four squares together and sew in an unbleached linen lining to create a structured bohemian tote bag or device sleeve.  
  * Work the final perimeter round in dense single-crochet stitches using reflective or high-visibility yarn to transform the square into a nighttime safety pouch.

# **3\. Triangular Modular Origami Trinket Box (Paper & Print)**

* **Source:** [Triangular Modular Origami Box — Instructables](https://www.instructables.com/Triangular-Modular-Origami-Box/)  
* **Summary:** An accessible geometric paper engineering build that transforms three square sheets of paper into a rigid, three-dimensional triangular container with a matching lid. Each sheet is folded into an identical modular unit featuring interlocking triangular tabs and receiving pocket folds; when the three units are slotted together, structural paper tension locks them into an equilateral triangular box without tape, glue, or scissors.  
* **Difficulty / Time:** Beginner; roughly 15–20 minutes of measuring, creasing, and slotting.  
* **Tweak It:**  
  * Fold the units from three contrasting patterned or textured cardstock sheets so each facet of the triangular prism displays a different geometric design.  
  * Scale up the starting paper size to 30cm heavy kraft paper to construct a sturdy desktop organizer for desk stationery or cable tidying.  
  * Fold a slightly smaller inner box (using 1cm trimmed squares) to create a telescoping, double-walled jewelry gift box with a snug vacuum fit.

# **4\. Poly Pipe Hoop Greenhouse & Shadehouse with Sprinklers (Garden & Outdoor)**

* **Source:** [Poly Pipe Greenhouse and Shadehouse With Sprinkler System — Instructables](https://www.instructables.com/Poly-Pipe-Greenhouse-and-Shadehouse-With-Sprinkler/)  
* **Summary:** An affordable, high-durability outdoor shadehouse and greenhouse built by bending 2-inch flexible polyethylene irrigation pipe into structural hoop arches over ground pickets. The frame is draped with heavy-duty UV-stabilized 70% shade cloth stitched with nylon twine, equipped with an overhead 13mm poly pipe micro-sprinkler line that creates a fine cooling rain mist across garden beds without wooden framing or welded metal.  
* **Difficulty / Time:** Intermediate; roughly 4–6 hours of pipe sizing, picket anchoring, and cloth stitching.  
* **Tweak It:**  
  * Connect the overhead sprinkler line to an automated battery-operated hose faucet timer to mist delicate orchids and seedlings on hot afternoons.  
  * Swap the 70% shade cloth for 6-mil UV-resistant greenhouse polyethylene film in winter months to create an insulated frost-free greenhouse.  
  * Incorporate a solar-powered 12V bilge pump connected to a rainwater collection barrel to automate pressurized irrigation off-grid.

# **5\. Oil-Free Microwave Potato Chips: Rapid Starch Gelatinization (Chemistry/Kitchen Crafts)**

* **Source:** [Microwave Potato Chips (Crisps) — Instructables](https://www.instructables.com/Microwave-Potato-Chips-Crisps/)  
* **Summary:** A fun culinary food chemistry demonstration exploring rapid water vaporization and starch gelatinization in potatoes without deep frying. Russet potatoes are sliced paper-thin (1mm) with a mandoline, rinsed thoroughly in cold water to wash away loose amylose surface starches, patted completely dry, tossed with a mere drop of olive oil and sea salt, and microwaved flat on parchment paper for 5 to 7 minutes until internal moisture evaporates completely, leaving behind shatteringly crisp, golden potato chips.  
* **Difficulty / Time:** Beginner; roughly 15 minutes active prep plus 7 minutes microwaving.  
* **Tweak It:**  
  * Dust the hot chips immediately after cooking with smoked paprika, nutritional yeast, and onion powder for an artisanal vegan BBQ crisp.  
  * Substitute russet potatoes with sweet potatoes, purple yams, or beet slices to observe how differing sugar and starch densities affect cooking times and crispness.  
  * Toss the sliced potatoes in a splash of malt vinegar and let sit for 10 minutes before drying to infuse genuine salt-and-vinegar tang deep into the chip matrix.

# **November 5, 2026**

# **1\. The \$3 Macro Pad: Ultra-Low-Cost CH552G WebUSB Keypad (Hardware & Electronics)**

* **Source:** [Macro Pad Cheap Enough To Give Away — Hackaday](https://hackaday.com/tag/makerfaire/)  
* **Summary:** Maker Toby Chui engineered a pocket-sized, business-card-shaped four-key macro pad built around the 20-cent WCH CH552G 8-bit USB microcontroller. Mounted with four mechanical switches onto a budget custom PCB with a 3D-printed snap-on base, the device pairs with a browser-based WebUSB configurator app that lets users remap hotkeys, string macros, and multimedia controls directly over USB without installing drivers, writing code, or reflashing firmware.  
* **Difficulty / Time:** Beginner to Intermediate; roughly 1–2 hours of soldering and 3D printing.  
* **Tweak It:**  
  * Add addressable RGB SK6812 mini LEDs beneath each switch to display visual layer profiles and status feedback.  
  * Expand the matrix layout from four discrete keys to an 8-key grid by adding small surface-mount switching diodes across the CH552G's remaining GPIO pins.  
  * Program custom HID consumer control codes to map single-touch mute, camera-toggle, and screen-sharing shortcuts for Zoom and Google Meet.

# **2\. Tabletop Cardboard Basketball Shootout Arcade (Games & Puzzles)**

* **Source:** [How to Make NBA Basketball Board Game From Cardboard — Instructables](https://www.instructables.com/How-to-Make-NBA-Basketball-Board-Game-From-Cardboa/)  
* **Summary:** An interactive tabletop arcade basketball game constructed entirely from recycled corrugated cardboard, paper cups, drinking straws, and ping-pong balls. The maker constructs a cardboard backboard with paper cup hoops, an angled ball return floor that rolls balls back to the player, and a spring-loaded catapult lever anchored with rubber bands, allowing players to practice shooting arcs and challenge friends in two-player tabletop shootouts without plastic kits.  
* **Difficulty / Time:** Beginner; roughly 1.5–2 hours of cardboard scoring, cutting, and lever assembly.  
* **Tweak It:**  
  * Line the hoop net with a miniature copper foil contact switch wired to an Arduino and 7-segment display to automatically count made baskets.  
  * Add a battery-operated motor and cam beneath the backboard to create a moving, side-to-side sweeping basket target for advanced difficulty.  
  * Paint the court with team logos and add clear plastic side guard rails cut from transparent packaging to keep fast rebounds contained on the table.

# **3\. Hand-Embroidered Patch with Sturdy Buttonhole Edge Binding (Textiles & Fiber Arts)**

* **Source:** [Finish a Hand-Embroidered Patch Like You Mean It — Instructables](https://www.instructables.com/Finish-a-Hand-Embroidered-Patch-Like-You-Mean-It/)  
* **Summary:** A meticulous textile craft project demonstrating how to transform delicate hand-embroidery into a durable, wash-resistant garment patch. Once the surface thread art is completed on cotton fabric, the maker backs it with a high-thread-count cotton lining, trims the perimeter close to the seam, inverts the patch, and hand-sews a dense, structural buttonhole border stitch using stranded embroidery floss, sealing raw edges and creating a clean, professional merrowed-border finish.  
* **Difficulty / Time:** Beginner; roughly 1–2 hours of hand-sewing and edge binding.  
* **Tweak It:**  
  * Iron double-sided fusible web (HeatnBond Ultrahold) to the reverse backing before cutting to turn the finished design into an iron-on patch.  
  * Incorporate metallic gold or silver embroidery thread into the perimeter buttonhole stitch to frame the patch in an ornamental lustrous border.  
  * Stitch a hook-and-loop (Velcro) backing onto the patch so it can be swapped modularly across tactical backpacks and jackets.

# **4\. Origami Magic Ball: Kinetic Accordion Sphere (Paper & Print)**

* **Source:** [Origami Magic Ball — Instructables](https://www.instructables.com/Origami-Magic-ball/)  
* **Summary:** An iconic geometric paper mechanism originally designed by Yuri Shumakov, folded from two square sheets of paper into a dense diamond waterbomb tessellation. By pre-creasing an intricate 16x16 diagonal valley-and-mountain grid, joining the sheets into a tube, and sequentially popping the triangular facets into concave and convex folds, the paper collapses into an elastic spherical ball that stretches, compresses, and snaps back like an accordion.  
* **Difficulty / Time:** Intermediate to Advanced; roughly 2–3 hours of patient grid creasing and careful structural collapsing.  
* **Tweak It:**  
  * Fold the magic ball from synthetic tear-proof Yupo or Tyvek sheet so the kinetic paper hinges withstand endless stretching and squeezing without tearing.  
  * Place a wireless inductive charging LED coil inside the hollow core before sealing the ends to turn the sphere into an interactive glowing desktop fidget.  
  * Scale down to small rectangular note sheets to fold a miniature collapsible bracelet that stretches over wrists.

# **5\. Zellij: Batteries-Included Terminal Workspace & Multiplexer in Rust (Software & Digital)**

* **Source:** [zellij-org/zellij: A terminal workspace with batteries included — GitHub](https://github.com/zellij-org/zellij)  
* **Summary:** Developer Aram Drevekenin and the Zellij open-source community created zellij, a modern terminal workspace and multiplexer written in Rust. Out of the box, it provides a full-featured terminal environment with responsive tiled layouts, floating panes, a built-in session resurrect engine, an intuitive status bar with discoverable keybindings, and an extensible WebAssembly (WASM) plugin ecosystem that runs seamlessly without complex initial configuration.  
* **Difficulty / Time:** Beginner; roughly 5–10 minutes to install via Cargo or system package managers and configure shell aliases.  
* **Tweak It:**  
  * Define custom KDL layout files (in \~/.config/zellij/layouts/) that automatically launch multi-pane development workspaces with code editors, live logs, and servers on startup.  
  * Use Zellij's built-in web-sharing mode to generate an encrypted link that allows teammates to collaboratively view and control terminal sessions directly in a web browser.  
  * Build lightweight custom terminal dashboard widgets in Rust or Zig compiled to WebAssembly that run directly inside Zellij status bars.

# **November 6, 2026**

# **1\. Digital Signal Processing and Audio Interface on the Pi Pico (Music & Performance-Adjacent)**

* **Source:** [Digital Signal Processing On The Pi Pico — Hackaday](https://hackaday.com/2026/04/29/digital-signal-processing-on-the-pi-pico/)  
* **Summary:** Developer WeebLabs transformed the Raspberry Pi Pico (RP2040) and Pico 2 (RP2350) into a high-performance USB audio interface and multi-channel digital signal processor (DSP). Utilizing both CPU cores without dedicated external DSP chips, the firmware processes 16- and 24-bit audio streams at up to 96 kHz, driving four to eight output channels with a 10-band parametric equalizer per channel, volume leveling, matrix mixing, and S/PDIF / I2S DAC multi-channel outputs.  
* **Difficulty / Time:** Intermediate; roughly 2–3 hours of wiring an I2S DAC board and flashing the C/C++ DSP library.  
* **Tweak It:**  
  * Wire physical rotary encoders or slide potentiometers to the Pico's ADC pins to map tactile hardware controls for bass, mid, and treble EQ bands.  
  * Add an optical TOSLINK transmitter module to output clean, noise-free digital S/PDIF optical audio directly to home theater receivers.  
  * Program a real-time audio spectrum visualizer outputting FFT frequency bins to a small SSD1306 OLED display mounted on the casing.

# **2\. Easy Galaxy Swirl Cold Process Soap in Upcycled Milk Cartons (Chemistry/Kitchen Crafts)**

* **Source:** [Easy Galaxy Swirl Cold Process Soap Recipe — Instructables](https://www.instructables.com/Easy-Galaxy-Swirl-Cold-Process-Soap-Recipe/)  
* **Summary:** An accessible saponification chemistry craft that formulates nourishing, long-lasting soap bars by reacting a balanced blend of coconut oil, shea butter, sweet almond oil, and castor oil with a sodium hydroxide (lye) solution. The maker divides the traced soap batter into three bowls, blends natural kaolin clay, colloidal oatmeal, and cosmetic micas, swirls the colored batters into a cosmic marbled pattern inside recycled paper milk cartons, and cures the sliced bars for 4 to 6 weeks.  
* **Difficulty / Time:** Beginner to Intermediate (safety goggles and gloves required for handling caustic lye); roughly 1.5 hours active prep plus 4 weeks curing.  
* **Tweak It:**  
  * Replace distilled water with chilled brewed coffee or coconut milk to add natural antioxidants and produce a denser, creamier lather.  
  * Fold in fine spent espresso grounds, volcanic pumice powder, or poppy seeds during the pour stage to introduce natural physical exfoliation.  
  * Scent the batter with therapeutic-grade cedarwood and lavender essential oils to create a relaxing aromatherapeutic shower experience.

# **3\. Origami Modular Spinning Top (Paper & Print)**

* **Source:** [Origami Spinning Top — Instructables](https://www.instructables.com/Origami-spinning-top/)  
* **Summary:** A captivating kinetic origami toy folded from three square sheets of paper without tape, glue, or wooden toothpicks. The maker folds three identical modular units with interlocking angled triangular flaps and interior receiving pockets; when slotted together symmetrically, the paper tensions outward into a balanced six-pointed geometric spinning top that spins smoothly on a flat table for up to 30 seconds when flicked by hand.  
* **Difficulty / Time:** Beginner; roughly 15–20 minutes of folding and interlocking.  
* **Tweak It:**  
  * Fold the three units from contrasting primary colors (red, yellow, and blue) so optical color mixing blends the facets into secondary colors while spinning.  
  * Use heavy-weight metallic foil paper or synthetic plastic paper (Yupo) to add rim mass and lower friction at the contact pivot point for longer spin durations.  
  * Scale up the starting paper size to 20cm heavy cardstock to create a large tabletop geometric conversation piece.

# **4\. Pico-Mac-Nano: Working 1984 Macintosh Emulator on RP2040 (Hardware & Electronics)**

* **Source:** [Pico-mac-nano Fits Working Macintosh On Barbie's Desk — Hackaday](https://hackaday.com/2025/05/26/pico-mac-nano-fits-working-macintosh-on-barbies-desk/)  
* **Summary:** Maker engineered Pico-mac-nano, a functional miniature replica of the original 1984 Macintosh 128k computer powered entirely by a Raspberry Pi Pico (RP2040). Housed inside a detailed 3D-printed miniature beige Macintosh desktop chassis, the microcontroller emulates the Motorola 68000 CPU in real time, driving a miniature color SPI TFT display running authentic Macintosh System 6 and MacPaint with USB keyboard and mouse input.  
* **Difficulty / Time:** Intermediate; roughly 4–6 hours across 3D printing, fine display soldering, and flashing the Pico Mac emulator firmware.  
* **Tweak It:**  
  * Wire a micro SD card breakout board over SPI to easily load and swap vintage Mac games and vintage productivity applications without reflashing firmware.  
  * Add a miniature surface-mount speaker driven by PWM audio to play the iconic classic Macintosh startup chime upon power-up.  
  * Package a tiny 150mAh LiPo battery inside the chassis with a TP4056 micro USB charging module to make the miniature Mac completely portable.

# **5\. 3D-Printed Modular Vertical Hydroponic Tower Garden (Garden & Outdoor)**

* **Source:** [3D Printed Modular Hydroponic Garden — Instructables](https://www.instructables.com/3D-Printed-Modular-Hydroponic-Garden/)  
* **Summary:** A high-density aeroponic and hydroponic vertical garden constructed from interlocking modular sections fabricated on an FDM 3D printer using PETG filament. Stackable modular tiers house standard 2-inch net cups with rockwool seedling cubes, while an internal flexible vinyl tube pumps nutrient water from a small submersible pump in a base reservoir up to a top dispersion lid, trickling nutrient solution down across exposed plant root systems in a continuous vertical cascade.  
* **Difficulty / Time:** Intermediate; roughly 2 hours of plumbing and assembly plus 12–16 hours 3D print time.  
* **Tweak It:**  
  * Connect the submersible water pump to a digital cycle timer plug set to run for 15 minutes every hour to optimize root oxygenation and prevent root rot.  
  * Integrate a waterproof DS18B20 digital temperature probe and a digital TDS/EC meter in the base reservoir to monitor water chemistry over Wi-Fi.  
  * Add full-spectrum LED grow light strips mounted along vertical support poles around the tower to grow fresh culinary herbs indoors year-round.

# **2026-11-06**

# **1\. hyperfine: Statistical Command-Line Benchmarking Tool in Rust (Software & Digital)**

* **Source:** [sharkdp/hyperfine: A command-line benchmarking tool — GitHub](https://github.com/sharkdp/hyperfine)  
* **Summary:** Developer David Peter (sharkdp) built hyperfine, a cross-platform command-line benchmarking utility written in Rust that runs statistical timing and hardware-counter analysis across arbitrary shell commands. To keep measurements accurate even for sub-5ms commands, it spawns processes directly without an intermediate shell by default (or calibrates and subtracts shell startup time when shell syntax is enabled), supports cache-clearing \`--prepare\` hooks and \`--warmup\` runs, and detects statistical outliers automatically. It also supports parameterized benchmark scans (\`--parameter-scan\` and \`--parameter-list\`) and exports results directly to Markdown tables, JSON, CSV, and AsciiDoc alongside Python scripts for plotting runtime histograms and whisker charts.  
* **Difficulty / Time:** Beginner; roughly 10–15 minutes to install via Cargo or a package manager and run your first multi-command benchmark comparison.  
* **Tweak It:**  
  * Pair \`--parameter-list branch main,feature\` with \`--setup 'git switch {branch}'\` inside a Git pre-push hook or CI workflow to automatically benchmark hot-path functions across branches and flag regressions.  
  * Use \`--metrics memory\_peak\_resident:MiB,time\_wall\_clock:ms,instructions,cache\_misses\` to profile both peak RAM footprint and CPU cache efficiency alongside execution speed.  
  * Pipe \`--export-json\` outputs into a custom Python script using \`uvx\` to generate automated SVG box-and-whisker comparison plots for project documentation and pull requests.

# **2\. RP2040-Based Eurorack Audio DSP Module with Vult (Music & Performance-Adjacent)**

* **Source:** [A Simple RP2040-Based Audio DSP Board — Hackaday](https://hackaday.com/2022/06/21/a-simple-rp2040-based-audio-dsp-board/)  
* **Summary:** Maker DatanoiseTV designed a Raspberry Pi RP2040-powered audio DSP hardware platform and FreeRTOS application template for building custom Eurorack modular synthesizers and effects processors. The board provides standard Eurorack connections—including MIDI input, Control Voltage (CV) inputs, 5V-compatible trigger jacks, and analog audio line-out—plus headers for a rotary encoder, pushbuttons, and an OLED screen for patch navigation. Audio synthesis and filter algorithms are written in the high-level Vult DSP language, which transcompiles into C++ code wrapped in FreeRTOS tasks and flashes straight to the RP2040 over USB-C, achieving 32-sample latency at 44.1 kHz.  
* **Difficulty / Time:** Intermediate; roughly 4–6 hours across PCB soldering, panel mounting, and compiling Vult DSP patches onto the RP2040.  
* **Tweak It:**  
  * Write a custom multi-tap delay or resonant state-variable filter in Vult and map the CV inputs to modulate filter cutoff frequency and feedback resonance in real time.  
  * Dedicate the RP2040's second ARM Cortex-M0+ core strictly to rendering a real-time oscilloscope waveform and parameter readout on the I2C OLED screen without introducing audio buffer dropouts.  
  * Add USB-MIDI device enumeration on the USB-C port so a laptop DAW can automate patch changes and send clock sync pulses alongside analog Eurorack triggers.

# **3\. Direct Spherification: Molecular Gastronomy Liquid Pearls (Chemistry/Kitchen Crafts)**

* **Source:** [Spherification (Direct Method) — Instructables](https://www.instructables.com/Spherification-Direct-Method/)  
* **Summary:** Maker ahorowitz15 documented the direct spherification kitchen chemistry technique to transform fruit juices and thin flavor bases into caviar-like pearls with ultra-thin gel membranes and liquid centers. You disperse 0.5% sodium alginate by weight into your flavored liquid (buffering with sodium citrate if the liquid's pH is below 3.6) using an immersion blender, strain it through a sieve, and chill it for 1–2 hours (or pull a vacuum) so trapped air bubbles escape. Dripping the mixture from a food syringe 3–6 inches above a 1% calcium chloride water bath crosslinks the alginate polymers on contact into thin hydrogel spheres in about 60 seconds before rinsing in two clean water baths.  
* **Difficulty / Time:** Beginner to Intermediate; roughly 30 minutes of weighing, blending, and dripping plus 1–2 hours of passive resting to de-aerate the alginate bath.  
* **Tweak It:**  
  * Build a multi-nozzle 3D-printed syringe manifold or perforated drip tray to form dozens of uniform caviar pearls simultaneously instead of dripping them one by one.  
  * Experiment with savory umami liquids—such as soy-dashi broth, aged balsamic glaze, or chili-infused lime juice buffered above pH 3.6—to make flavor bursts for ramen, salads, or tacos.  
  * Time sequential batches in the calcium chloride bath at 30, 60, 90, and 120 seconds to map how calcium ion diffusion depth changes membrane thickness and pop texture.

# **4\. 16-Cell Modular Tetrahedral Kite (Games & Puzzles)**

* **Source:** [How to Make a Tetrahedral Kite (16-Cells) — Instructables](https://www.instructables.com/How-to-Make-a-Tetrahedral-Kite-16-Cells/)  
* **Summary:** Maker SkyFox7767 built a three-dimensional 16-cell tetrahedral kite inspired by Alexander Graham Bell's geometric space-frame kites using 96 paper drinking straws, fishing line, spray adhesive, and lightweight colored fabric. Each individual tetrahedral cell is formed by threading fishing line through six straws into a rigid triangular pyramid and gluing two-sided fabric wing flaps made from a construction-paper template onto two adjacent faces. Four cells are tied together at their vertices to create a 4-cell pyramid, and four of these sub-assemblies are lashed into a self-stabilizing 16-cell aerodynamic truss that flies stably without heavy spars.  
* **Difficulty / Time:** Beginner to Intermediate (simple steps, patience-intensive assembly); roughly 3–4 hours to thread 16 cells, glue 32 fabric sails, and lash the pyramid frame.  
* **Tweak It:**  
  * Swap standard fabric for ultralight aluminized Mylar emergency-blanket film or ripstop nylon to cut wing weight and increase lift in light breezes.  
  * Design 3D-printed flexible TPU 4-way and 6-way vertex corner connectors so the 16 tetrahedral cells can snap together and pack flat for easy transport to the park.  
  * Scale the modular geometry up from 16 cells to a 64-cell four-tier pyramid by joining four 16-cell kites at their corners for high-altitude payload lifting.

# **5\. Heat-Formed EVA Foam Spartan Cosplay Helmet (Textiles & Fiber Arts)**

* **Source:** [DIY Spartan Helmet Costume From Foam\! — Instructables](https://www.instructables.com/DIY-Spartan-Helmet-Costume-From-Foam/)  
* **Summary:** Cosplay maker LostWax created a wearable, movie-style Spartan helmet fabricated from 6–7mm EVA foam floor mats and 2mm craft foam detailing sheets. Paper pattern pieces are traced onto the foam with a gel pen and cut with a sharp utility knife using angled 45-degree undercuts on key seams, then glued inside-out along alignment marks with low-temperature hot glue or contact cement before flipping the dome right-side-out and heat-forming the curved cheek guards with a heat gun. A hollow box-formed foam crest plume, layered 2mm swirl visor embellishments, and 4mm edge trim strips complete the structure, which is sealed with three stippled coats of black acrylic basecoat and finger-rubbed with vintage brass and pewter metallic paints for an antique weathered finish.  
* **Difficulty / Time:** Intermediate; roughly 4–6 hours across pattern cutting, seam gluing, heat-forming, and multi-coat metallic weathering.  
* **Tweak It:**  
  * Line the interior crown and cheek plates with breathable moisture-wicking microsuede fabric and Velcro-backed upholstery foam pads for comfortable all-day convention wear.  
  * Embed hidden neodymium disc magnets inside the helmet ridge and the base of the foam crest plume so the plume detaches cleanly for travel and swaps between different crest styles.  
  * Route thin flexible COB LED filament strips behind the eye cutouts powered by a coin-cell pack tucked into the brow cavity for a glowing fantasy armor effect.