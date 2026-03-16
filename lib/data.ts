export const PASSWORD = "valencia2026";

export const MEMBERS = ["Adi", "Ale", "Christian", "Tara", "Victoria", "Ben", "Santi"];

export const MEMBER_COLORS: Record<string, string> = {
  Adi: "#E8A87C", Ale: "#85CDCA", Christian: "#D4A5E5", Tara: "#F6CD61",
  Victoria: "#FE8A71", Ben: "#6EB5FF", Santi: "#C3E88D",
};

export const MEMBER_EMOJIS: Record<string, string> = {
  Adi: "🌸", Ale: "🌊", Christian: "⚡", Tara: "🌟",
  Victoria: "🦋", Ben: "🎯", Santi: "🔥",
};

export type Activity = {
  id: string;
  time: string;
  name: string;
  type: string;
  free: boolean;
  desc: string;
};

export type Day = {
  date: string;
  weekday: string;
  label: string;
  theme: string;
  icon: string;
  color: string;
  canTravel: boolean;
  note: string;
  activities: Activity[];
};

export const TYPE_ICONS: Record<string, string> = {
  rest: "😴", walk: "🚶", food: "☕", meal: "🍽️", market: "🛒", culture: "🏛️",
  scenic: "📸", activity: "🎯", beach: "🏖️", nature: "🌿", transport: "🚗", errand: "🛍️",
};

export const DAYS: Day[] = [
  {
    date: "Mar 31", weekday: "Mar", label: "Día de Llegada", theme: "Descanso y Llegada", icon: "🛬", color: "#8B9DAF",
    canTravel: false, note: "Día tranquilo — recuperación del viaje. Quedarse cerca de la base.",
    activities: [
      { id: "d0-0", time: "10:00", name: "Dormir y descansar del viaje", type: "rest", free: true, desc: "Sin prisa. Que cada uno se recupere a su ritmo." },
      { id: "d0-1", time: "11:30", name: "Paseo a una panadería cercana", type: "food", free: false, desc: "Ensaimadas, napolitanas y café con leche en una panadería local." },
      { id: "d0-2", time: "12:30", name: "Paseo de orientación por el barrio", type: "walk", free: true, desc: "Ubicar la farmacia, supermercado y la parada de metro/bus más cercana." },
      { id: "d0-3", time: "14:00", name: "🍽️ Comida — algo ligero en casa o bar", type: "meal", free: false, desc: "Bocadillos o menú del día en un bar del barrio (~€10-14)." },
      { id: "d0-4", time: "15:30", name: "Siesta / tiempo de relax", type: "rest", free: true, desc: "A la española. Recargar pilas para la tarde." },
      { id: "d0-5", time: "17:00", name: "Paseo por el Jardín del Túria", type: "walk", free: true, desc: "El parque urbano más largo de Europa, en un antiguo cauce. Perfecto primer paseo." },
      { id: "d0-6", time: "18:00", name: "Compra en supermercado para la semana", type: "errand", free: false, desc: "Agua, fruta, snacks y cosas para el desayuno." },
      { id: "d0-7", time: "19:00", name: "Atardecer desde el Puente de las Flores", type: "scenic", free: true, desc: "Luz dorada sobre los jardines del Túria." },
      { id: "d0-8", time: "20:30", name: "🍽️ Cena — tapas informales cerca", type: "meal", free: false, desc: "Patatas bravas, croquetas, cerveza local. Sin complicaciones." },
      { id: "d0-9", time: "22:00", name: "Paseo nocturno o a dormir temprano", type: "rest", free: true, desc: "Digerir la cena o directo a la cama. ¡Vienen días grandes!" },
    ],
  },
  {
    date: "Abr 1", weekday: "Mié", label: "Día 2", theme: "Casco Antiguo e Historia", icon: "🏛️", color: "#C4956A",
    canTravel: false, note: "Explorar el impresionante centro histórico. Casi todo gratis y a pie.",
    activities: [
      { id: "d1-0", time: "09:30", name: "Mercado Central — desayuno y paseo", type: "market", free: true, desc: "Uno de los mercados más grandes de Europa. Entrada libre, zumos y bollería dentro." },
      { id: "d1-1", time: "10:30", name: "La Lonja de la Seda", type: "culture", free: false, desc: "Patrimonio de la Humanidad UNESCO. Salón gótico impresionante. ~€2." },
      { id: "d1-2", time: "11:15", name: "Plaza de la Reina y Catedral (exterior)", type: "walk", free: true, desc: "La plaza principal y la catedral. ¡Dicen que dentro está el Santo Grial!" },
      { id: "d1-3", time: "12:00", name: "Subir a las Torres de Serranos", type: "culture", free: false, desc: "Puerta medieval con vistas panorámicas de Valencia. ~€2." },
      { id: "d1-4", time: "12:45", name: "Callejear por el Barrio del Carmen", type: "walk", free: true, desc: "El barrio más antiguo. Arte urbano, plazuelas escondidas, ambiente bohemio." },
      { id: "d1-5", time: "14:00", name: "🍽️ Comida — menú del día en El Carmen", type: "meal", free: false, desc: "Menú de 3 platos por €10-14. Gran relación calidad-precio." },
      { id: "d1-6", time: "15:30", name: "IVAM — Arte Moderno (¡GRATIS los miércoles!)", type: "culture", free: true, desc: "Entrada gratuita los miércoles. Arte contemporáneo y español del siglo XX." },
      { id: "d1-7", time: "17:00", name: "Horchata y fartons en Horchatería Santa Catalina", type: "food", free: false, desc: "Bebida tradicional de chufa. Imprescindible. ~€4-5 por persona." },
      { id: "d1-8", time: "17:45", name: "Plaza Redonda y tiendas artesanas", type: "walk", free: true, desc: "Plaza circular única con tiendas de artesanía." },
      { id: "d1-9", time: "18:30", name: "Museo de Bellas Artes (siempre GRATIS)", type: "culture", free: true, desc: "Uno de los mejores de España. El Greco, Goya, Velázquez, Sorolla." },
      { id: "d1-10", time: "20:30", name: "🍽️ Cena — ruta de tapas por Ruzafa o El Carmen", type: "meal", free: false, desc: "2-3 bares, compartir platos. Ruzafa = moderno, El Carmen = clásico." },
      { id: "d1-11", time: "22:00", name: "Paseo nocturno por el casco iluminado", type: "walk", free: true, desc: "La catedral y plazas iluminadas por la noche. Mágico." },
    ],
  },
  {
    date: "Abr 2", weekday: "Jue", label: "Día 3", theme: "Ciudad de las Artes + Playa", icon: "🔬", color: "#4A90A4",
    canTravel: false, note: "El complejo futurista de Valencia + tiempo de playa mediterránea.",
    activities: [
      { id: "d2-0", time: "09:00", name: "Caminar por el Túria hasta la Ciudad de las Artes", type: "walk", free: true, desc: "2km preciosos por el parque. Parques infantiles, fuentes, Parque Gulliver." },
      { id: "d2-1", time: "09:30", name: "Parque Gulliver — escultura gigante para escalar", type: "activity", free: true, desc: "Gulliver gigante para trepar. ¡Divertido para todas las edades!" },
      { id: "d2-2", time: "10:30", name: "Ciudad de las Artes — fotos del exterior", type: "scenic", free: true, desc: "La arquitectura de Calatrava es espectacular. Pasear gratis entre los edificios." },
      { id: "d2-3", time: "11:00", name: "Hemisfèric — película IMAX", type: "culture", free: false, desc: "Edificio en forma de ojo. Películas de naturaleza/espacio. ~€8-10." },
      { id: "d2-4", time: "12:30", name: "L'Umbracle — paseo jardín de esculturas", type: "walk", free: true, desc: "Paseo ajardinado con plantas mediterráneas y esculturas contemporáneas." },
      { id: "d2-5", time: "13:30", name: "🍽️ Comida — picnic o Mercado de Colón", type: "meal", free: false, desc: "Precioso edificio modernista con restaurantes dentro." },
      { id: "d2-6", time: "15:00", name: "Playa de la Malvarrosa — baño y sol", type: "beach", free: true, desc: "Playa principal de la ciudad. Arena amplia, agua tranquila. ¡Llevar toallas!" },
      { id: "d2-7", time: "16:30", name: "Pasear por el Paseo Marítimo", type: "walk", free: true, desc: "Paseo frente al mar con palmeras." },
      { id: "d2-8", time: "17:30", name: "Zona de Las Arenas", type: "beach", free: true, desc: "Zona algo más elegante con balnearios restaurados." },
      { id: "d2-9", time: "18:30", name: "Atardecer desde la playa o el puerto", type: "scenic", free: true, desc: "Puesta de sol mediterránea. Tomar algo en un chiringuito." },
      { id: "d2-10", time: "20:30", name: "🍽️ Cena — marisco en el paseo marítimo", type: "meal", free: false, desc: "Restaurantes clásicos valencianos de mariscos. ¡Paella frente al mar!" },
      { id: "d2-11", time: "22:00", name: "Paseo nocturno por la Marina", type: "walk", free: true, desc: "Zona del puerto de la Copa América. Bares, barcos, ambiente." },
    ],
  },
  {
    date: "Abr 3", weekday: "Vie", label: "Día 4", theme: "Excursión: Albufera", icon: "🚣", color: "#5B8C5A",
    canTravel: true, note: "🚗 DÍA DE VIAJE — 30 min al sur. Arrozales, paseo en barca, cuna de la paella.",
    activities: [
      { id: "d3-0", time: "09:00", name: "Ir en coche/bus a la Albufera", type: "transport", free: false, desc: "~30 min en coche o bus EMT 25 desde Plaza del Ayuntamiento." },
      { id: "d3-1", time: "09:45", name: "Caminar por los senderos de arrozales", type: "nature", free: true, desc: "Senderos llanos entre campos de arroz. Avistamiento de aves." },
      { id: "d3-2", time: "10:30", name: "Explorar el pueblo de El Palmar", type: "walk", free: true, desc: "Pueblo pesquero con encanto. Barracas tradicionales de paja." },
      { id: "d3-3", time: "11:00", name: "Paseo en barca por la laguna", type: "activity", free: false, desc: "~€4-5/persona por 30-40 min. Tranquilo, vistas preciosas." },
      { id: "d3-4", time: "12:00", name: "Avistamiento de aves en miradores", type: "nature", free: true, desc: "Garzas, garcetas, flamencos en temporada. ¡Llevar prismáticos!" },
      { id: "d3-5", time: "13:00", name: "Visitar una barraca valenciana tradicional", type: "culture", free: true, desc: "Casas restauradas abiertas a visitantes." },
      { id: "d3-6", time: "14:00", name: "🍽️ Comida — ¡PAELLA AUTÉNTICA en El Palmar!", type: "meal", free: false, desc: "¡Donde nació la paella! Restaurantes como Bon Aire o Nou Racó. ~€15-20pp." },
      { id: "d3-7", time: "16:00", name: "Playa de El Saler y dunas salvajes", type: "nature", free: true, desc: "Playa salvaje, poco turística, con sistema dunar natural." },
      { id: "d3-8", time: "17:00", name: "Bici por los caminos del parque (alquiler)", type: "activity", free: false, desc: "~€8-10 alquiler. Terreno llano, perfecto para pedalear." },
      { id: "d3-9", time: "18:30", name: "Atardecer sobre la laguna de la Albufera", type: "scenic", free: true, desc: "Uno de los atardeceres más famosos de España. El cielo se refleja en el agua." },
      { id: "d3-10", time: "19:30", name: "Vuelta a Valencia", type: "transport", free: false, desc: "Trayecto corto de regreso." },
      { id: "d3-11", time: "21:00", name: "🍽️ Cena — algo ligero en casa", type: "meal", free: false, desc: "Después de esa paella enorme, cenar ligero. Embutidos, pan y vino." },
    ],
  },
  {
    date: "Abr 4", weekday: "Sáb", label: "Día 5", theme: "Excursión: Castillo de Xàtiva", icon: "🏰", color: "#8B6F4E",
    canTravel: true, note: "🚗 DÍA DE VIAJE — 1h en tren. Castillo en lo alto de la colina con vistas increíbles.",
    activities: [
      { id: "d4-0", time: "08:30", name: "Tren a Xàtiva (Cercanías C2)", type: "transport", free: false, desc: "~1 hora, ~€4 ida. Sale de la Estació del Nord." },
      { id: "d4-1", time: "09:45", name: "Café en el casco antiguo de Xàtiva", type: "food", free: false, desc: "Café con leche en la plaza principal antes de subir." },
      { id: "d4-2", time: "10:15", name: "Subida al Castillo de Xàtiva", type: "activity", free: false, desc: "~30 min a pie o trenecito turístico €1.50. Castillo ~€2.40." },
      { id: "d4-3", time: "11:00", name: "Explorar las dos secciones del castillo", type: "culture", free: false, desc: "Castillo Menor y Mayor. Capas romanas, árabes y medievales. Vistas panorámicas." },
      { id: "d4-4", time: "12:00", name: "Jardines de Ibn Hazm (dentro del castillo)", type: "nature", free: false, desc: "Jardines restaurados dentro de las murallas. Tranquilos y con sombra." },
      { id: "d4-5", time: "12:45", name: "Bajar por las calles medievales", type: "walk", free: true, desc: "Calles empedradas, iglesias antiguas, historia de los Borgia." },
      { id: "d4-6", time: "13:15", name: "Colegiata Basílica de Santa María", type: "culture", free: true, desc: "Impresionante iglesia renacentista. Entrada gratuita." },
      { id: "d4-7", time: "14:00", name: "🍽️ Comida — arròs al forn (arroz al horno)", type: "meal", free: false, desc: "¡Especialidad de Xàtiva! ~€12-15pp." },
      { id: "d4-8", time: "15:30", name: "Museo de L'Almodí", type: "culture", free: false, desc: "Edificio gótico. Arte local y arqueología. ~€2." },
      { id: "d4-9", time: "16:30", name: "Helado y pasear por las plazas", type: "walk", free: false, desc: "Descansar. Buscar dulces artesanos o cerámica." },
      { id: "d4-10", time: "17:30", name: "Tren de vuelta a Valencia", type: "transport", free: false, desc: "Trenes cada 30-60 min." },
      { id: "d4-11", time: "19:00", name: "Museo de Cerámica (¡GRATIS sábados tarde!)", type: "culture", free: true, desc: "Gratis después de las 16h los sábados. Palacio rococó impresionante." },
      { id: "d4-12", time: "21:00", name: "🍽️ Cena — barrio de Ruzafa", type: "meal", free: false, desc: "El barrio más moderno de Valencia. Buena mezcla gastronómica." },
    ],
  },
  {
    date: "Abr 5", weekday: "Dom", label: "Día 6", theme: "Semana Santa Marinera + Museos Gratis", icon: "⛪", color: "#9B6B9E",
    canTravel: true, note: "🚗 DÍA DE VIAJE — ¡Semana Santa! Museos GRATIS los domingos. Procesiones marineras en el Cabanyal.",
    activities: [
      { id: "d5-0", time: "09:30", name: "Procesiones de Semana Santa Marinera — Cabanyal", type: "culture", free: true, desc: "Procesiones únicas del barrio pesquero. Tradición marinera." },
      { id: "d5-1", time: "10:30", name: "Explorar el barrio del Cabanyal", type: "walk", free: true, desc: "Antiguo barrio de pescadores. Fachadas de azulejos de colores." },
      { id: "d5-2", time: "11:30", name: "La Lonja de la Seda (¡GRATIS domingos!)", type: "culture", free: true, desc: "Patrimonio UNESCO. Gratis todos los domingos." },
      { id: "d5-3", time: "12:15", name: "Museo de Cerámica (¡GRATIS domingos!)", type: "culture", free: true, desc: "Palacio del Marqués de Dos Aguas. Gratis todo el domingo." },
      { id: "d5-4", time: "13:15", name: "Paseo hasta la Plaza del Ayuntamiento", type: "walk", free: true, desc: "Gran plaza principal. Arquitectura y fuente preciosa." },
      { id: "d5-5", time: "14:00", name: "🍽️ Comida — ¡tradición dominical de paella!", type: "meal", free: false, desc: "Los valencianos comen paella los domingos. ¡Únete a la tradición!" },
      { id: "d5-6", time: "16:00", name: "Bioparc Valencia (zoo para amantes de animales)", type: "activity", free: false, desc: "Zoo con ecosistemas africanos. ~€26 adultos. Gran gasto pero vale la pena." },
      { id: "d5-7", time: "16:00", name: "ALT: Jardines de Monforte (jardín gratis)", type: "nature", free: true, desc: "Jardín neoclásico con estatuas y fuentes. Joya escondida, totalmente gratis." },
      { id: "d5-8", time: "17:30", name: "IVAM — ¡entrada gratuita los domingos!", type: "culture", free: true, desc: "Museo de arte contemporáneo. Gratis todo el domingo." },
      { id: "d5-9", time: "18:30", name: "Atardecer desde el Puente del Real", type: "walk", free: true, desc: "Puente histórico. Vistas sobre los jardines del Túria." },
      { id: "d5-10", time: "19:30", name: "Horchata en Alboraya (¡el pueblo original!)", type: "food", free: false, desc: "Donde nació la horchata. La más fresca que probarás. ~€4." },
      { id: "d5-11", time: "21:00", name: "🍽️ Cena — fideuà o all i pebre", type: "meal", free: false, desc: "La prima hermana de la paella (fideos) o estofado de anguila." },
    ],
  },
  {
    date: "Abr 6", weekday: "Lun", label: "Día 7", theme: "Excursión: Peñíscola O Sagunto", icon: "⚔️", color: "#C75B39",
    canTravel: true, note: "🚗 DÍA DE VIAJE — Elegir: Peñíscola (1.5h, castillo junto al mar) O Sagunto (30min, ruinas romanas).",
    activities: [
      { id: "d6-0", time: "08:00", name: "OPCIÓN A: Ir a Peñíscola (~1.5h)", type: "transport", free: false, desc: "'Ciudad en el Mar'. Castillo en un peñón. ¡Localización de Juego de Tronos!" },
      { id: "d6-1", time: "08:00", name: "OPCIÓN B: Tren a Sagunto (~30 min)", type: "transport", free: false, desc: "Teatro romano, castillo en la colina, judería. ~€3 cada trayecto." },
      { id: "d6-2", time: "10:00", name: "Peñíscola: Casco antiguo y castillo templario", type: "culture", free: false, desc: "Castillo del Papa Luna ~€5. Calles estrechas, vistas al mar." },
      { id: "d6-3", time: "10:00", name: "Sagunto: Teatro Romano y Castillo (¡GRATIS!)", type: "culture", free: true, desc: "Teatro de 2000 años. ¡Entrada gratuita! Vistas desde la colina." },
      { id: "d6-4", time: "11:30", name: "Peñíscola: Recorrer las murallas del acantilado", type: "walk", free: true, desc: "Mediterráneo a ambos lados. Impresionante." },
      { id: "d6-5", time: "11:30", name: "Sagunto: Pasear por la Judería", type: "walk", free: true, desc: "Calles estrechas del antiguo barrio judío. Atmosférico." },
      { id: "d6-6", time: "13:00", name: "Playa en cualquier destino", type: "beach", free: true, desc: "Peñíscola: Playa Norte (Bandera Azul). Sagunto: playa local." },
      { id: "d6-7", time: "14:00", name: "🍽️ Comida — marisco fresco mediterráneo", type: "meal", free: false, desc: "Peñíscola: famosos langostinos. ~€12-18pp." },
      { id: "d6-8", time: "15:30", name: "Exploración y compras por la tarde", type: "walk", free: true, desc: "Cerámica local, tiendas artesanas." },
      { id: "d6-9", time: "17:00", name: "Últimas vistas y fotos antes de volver", type: "scenic", free: true, desc: "Último vistazo al castillo o la costa." },
      { id: "d6-10", time: "18:00", name: "Vuelta a Valencia en coche/tren", type: "transport", free: false, desc: "Viaje de regreso. Descansar en el camino." },
      { id: "d6-11", time: "20:30", name: "🍽️ Cena — tu sitio favorito hasta ahora", type: "meal", free: false, desc: "¡A estas alturas ya tenéis favoritos! Volver al mejor." },
    ],
  },
  {
    date: "Abr 7", weekday: "Mar", label: "Día 8", theme: "Ciencia, Exposiciones y Ruzafa", icon: "🎨", color: "#D4A843",
    canTravel: false, note: "Ritmo más suave después de los días de viaje. Exposiciones, cultura, el barrio más moderno.",
    activities: [
      { id: "d7-0", time: "09:30", name: "Exposición Inmersiva Leonardo Da Vinci", type: "culture", free: false, desc: "En el Museu de les Ciències. ¡Hasta el 13 de abril! ~€8-12." },
      { id: "d7-1", time: "11:00", name: "Museu de les Ciències — ciencia interactiva", type: "culture", free: false, desc: "Museo interactivo enorme en el edificio de Calatrava. ~€8." },
      { id: "d7-2", time: "12:30", name: "L'Oceanogràfic — acuario más grande de Europa", type: "activity", free: false, desc: "Delfines, tiburones, pingüinos. ~€34. Merece la pena." },
      { id: "d7-3", time: "12:30", name: "ALT: Paseo gratis por las piscinas exteriores", type: "walk", free: true, desc: "Saltar el acuario y disfrutar la arquitectura reflejada en el agua." },
      { id: "d7-4", time: "14:00", name: "🍽️ Comida — zona del Mercado de Colón", type: "meal", free: false, desc: "Edificio modernista con varios restaurantes dentro." },
      { id: "d7-5", time: "15:30", name: "Explorar el barrio de Ruzafa", type: "walk", free: true, desc: "El barrio más vibrante. Tiendas vintage, cafés, arte urbano." },
      { id: "d7-6", time: "16:30", name: "Café y dulce en un café de Ruzafa", type: "food", free: false, desc: "Dulce de Leche, Bluebell Coffee, Ubik Café. ~€4-5." },
      { id: "d7-7", time: "17:00", name: "CaixaForum — Exposición Música y Matemáticas", type: "culture", free: false, desc: "Hasta agosto 2026. Centro cultural precioso. ~€6." },
      { id: "d7-8", time: "18:30", name: "Jardines del Real (Viveros)", type: "nature", free: true, desc: "Parque grande con fuentes y rosaleda. Entrada libre." },
      { id: "d7-9", time: "19:30", name: "Exposición del Santo Grial en el Almudín", type: "culture", free: false, desc: "Hasta octubre 2026. ¡Valencia dice tener el auténtico Grial! ~€5." },
      { id: "d7-10", time: "21:00", name: "🍽️ Cena — tapas y vinos por Ruzafa", type: "meal", free: false, desc: "La mejor escena gastronómica de Valencia. Probar 2-3 sitios." },
    ],
  },
  {
    date: "Abr 8", weekday: "Mié", label: "Día 9", theme: "Joyas Ocultas y Vida Local", icon: "💎", color: "#6B8E7B",
    canTravel: false, note: "Descubrir la Valencia que los turistas no ven. Mercados, jardines, rincones locales.",
    activities: [
      { id: "d8-0", time: "09:00", name: "Mercado de Ruzafa — mercado local", type: "market", free: true, desc: "Donde compran los vecinos. Más auténtico que el Central." },
      { id: "d8-1", time: "10:00", name: "Bombas Gens Centre d'Art", type: "culture", free: true, desc: "Arte contemporáneo en fábrica de los años 30. Entrada gratuita. Joya secreta." },
      { id: "d8-2", time: "11:30", name: "Jardines de Monforte", type: "nature", free: true, desc: "Jardín neoclásico con estatuas de mármol y setos recortados. Gratis." },
      { id: "d8-3", time: "12:00", name: "Iglesia de San Nicolás — 'Capilla Sixtina valenciana'", type: "culture", free: false, desc: "Frescos restaurados que cubren todo el techo. ~€7. Merece totalmente." },
      { id: "d8-4", time: "13:00", name: "Paseo por la zona de Plaza del Patriarca", type: "walk", free: true, desc: "Barrio universitario elegante. Arquitectura renacentista." },
      { id: "d8-5", time: "14:00", name: "🍽️ Comida — probar esgarraet y platos locales", type: "meal", free: false, desc: "Pimientos asados + bacalao salado. Clásico valenciano." },
      { id: "d8-6", time: "15:30", name: "Museo de Bellas Artes — salas de Sorolla", type: "culture", free: true, desc: "Colección permanente de Sorolla. Siempre gratis." },
      { id: "d8-7", time: "17:00", name: "Paseo por el Cabanyal — fachadas modernistas", type: "walk", free: true, desc: "Antiguo barrio pesquero con azulejos art nouveau increíbles." },
      { id: "d8-8", time: "18:00", name: "Playa de la Patacona — alternativa tranquila", type: "beach", free: true, desc: "Al norte de la Malvarrosa. Menos gente, mismo mar precioso." },
      { id: "d8-9", time: "19:30", name: "Bebida al atardecer en un chiringuito", type: "food", free: false, desc: "Cerveza o tinto de verano frente al mar. ~€3-5." },
      { id: "d8-10", time: "21:00", name: "🍽️ Cena — ¿guardar el planazo para mañana?", type: "meal", free: false, desc: "Ir informal hoy y reservar la gran cena de despedida para mañana." },
    ],
  },
  {
    date: "Abr 9", weekday: "Jue", label: "Día 10", theme: "Último Día Completo y Despedida", icon: "🌅", color: "#A15D6A",
    canTravel: false, note: "Revisitar favoritos, últimos recuerdos y una cena especial de despedida.",
    activities: [
      { id: "d9-0", time: "09:30", name: "Mercado Central — souvenirs gastronómicos", type: "market", free: true, desc: "Azafrán, pimentón, aceite de oliva, turrón. Regalos perfectos." },
      { id: "d9-1", time: "10:30", name: "Visitar lo que quedó pendiente", type: "culture", free: true, desc: "Mañana para volver a ver algo o cubrir lo que faltó." },
      { id: "d9-2", time: "11:00", name: "Subir al Miguelete (torre de la Catedral)", type: "culture", free: false, desc: "207 escalones para la mejor vista panorámica. ~€2-3." },
      { id: "d9-3", time: "11:45", name: "Café en la Plaza de la Virgen", type: "food", free: false, desc: "Una de las plazas más bonitas. Sentarse y absorber el ambiente." },
      { id: "d9-4", time: "12:30", name: "Último paseo por las calles favoritas", type: "walk", free: true, desc: "Volver al lugar que más os haya enamorado." },
      { id: "d9-5", time: "13:30", name: "Exposición Francisco Mora en el Ayuntamiento", type: "culture", free: true, desc: "Exposición de arquitectura. Edificio del Ayuntamiento. Gratis." },
      { id: "d9-6", time: "14:00", name: "🍽️ Comida — volver al sitio nº1 del viaje", type: "meal", free: false, desc: "Repetir el mejor restaurante de la semana." },
      { id: "d9-7", time: "16:00", name: "Última visita a la playa", type: "beach", free: true, desc: "Un último baño mediterráneo o paseo por la arena." },
      { id: "d9-8", time: "17:30", name: "Hacer maletas y descansar antes de cenar", type: "rest", free: true, desc: "Organizar todo para la salida de mañana." },
      { id: "d9-9", time: "18:30", name: "Paseo dorado por los jardines del Túria", type: "walk", free: true, desc: "Luz perfecta para las últimas fotos." },
      { id: "d9-10", time: "20:00", name: "Agua de Valencia — ¡brindis de celebración!", type: "food", free: false, desc: "El cóctel de Valencia: cava + zumo de naranja + vodka + ginebra. ~€8/jarra." },
      { id: "d9-11", time: "21:00", name: "🍽️ CENA DE DESPEDIDA — restaurante especial", type: "meal", free: false, desc: "¡Noche de darse un capricho! Una cena valenciana para recordar. ~€25-35pp." },
    ],
  },
  {
    date: "Abr 10", weekday: "Vie", label: "Salida", theme: "Adiós Valencia", icon: "✈️", color: "#7B8FA1",
    canTravel: false, note: "Día de salida. Desayuno, últimos vistazos y a volar.",
    activities: [
      { id: "d10-0", time: "08:00", name: "Desayuno en el café favorito", type: "food", free: false, desc: "Último café con leche en Valencia." },
      { id: "d10-1", time: "09:00", name: "Paseo de despedida", type: "walk", free: true, desc: "Una vuelta corta por lo que más os guste." },
      { id: "d10-2", time: "10:00", name: "Últimas compras de recuerdos", type: "errand", free: false, desc: "¿Se olvidó algo? A las tiendas." },
      { id: "d10-3", time: "11:00", name: "Ir al aeropuerto / estación", type: "transport", free: false, desc: "Metro al aeropuerto ~25 min desde el centro." },
    ],
  },
];
