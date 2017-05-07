import {Injectable} from '@angular/core';

declare let google;

@Injectable()

/**
 * Used by the application to get the polygons stored in the application.
 */
export class PolygonProvider {
  private _buildingPolygons: {building: Number, coordinates: {}[], fillColor: String, strokeColor: String}[];
  private _roomPolygons: {room: String, coordinates: {}[], description: String, fillColor: String, strokeColor: String}[];

  /**
   * Populates the building polygon and room polygon arrays with data for Park Campus and Waterworth Building.
   */
  constructor() {
    this._buildingPolygons = [
      {
        building: 1,
        coordinates: [
          new google.maps.LatLng(51.887987, -2.087384),
          new google.maps.LatLng(51.887938, -2.087888),
          new google.maps.LatLng(51.887988, -2.087903),
          new google.maps.LatLng(51.887983, -2.087945),
          new google.maps.LatLng(51.887841, -2.087908),
          new google.maps.LatLng(51.887844, -2.087875),
          new google.maps.LatLng(51.887669, -2.087832),
          new google.maps.LatLng(51.887668, -2.087845),
          new google.maps.LatLng(51.887634, -2.087836),
          new google.maps.LatLng(51.887679, -2.087482),
          new google.maps.LatLng(51.887730, -2.087490),
          new google.maps.LatLng(51.887710, -2.087679),
          new google.maps.LatLng(51.887776, -2.087696),
          new google.maps.LatLng(51.887774, -2.087724),
          new google.maps.LatLng(51.887791, -2.087729),
          new google.maps.LatLng(51.887831, -2.087342)
        ],
        fillColor: "#fff",
        strokeColor: "#ccc"
      },
      {
        building: 2,
        coordinates: [
          new google.maps.LatLng(51.885804, -2.090255),
          new google.maps.LatLng(51.885754, -2.090370),
          new google.maps.LatLng(51.885695, -2.090302),
          new google.maps.LatLng(51.885744, -2.090187)
        ],
        fillColor: "#fff",
        strokeColor: "#ccc"
      },
      {
        building: 3,
        coordinates: [
          new google.maps.LatLng(51.886674, -2.087231),
          new google.maps.LatLng(51.886622, -2.087344),
          new google.maps.LatLng(51.886628, -2.087353),
          new google.maps.LatLng(51.886585, -2.087444),
          new google.maps.LatLng(51.886462, -2.087291),
          new google.maps.LatLng(51.886559, -2.087086)
        ],
        fillColor: "#fff",
        strokeColor: "#ccc"
      },
      {
        building: 4,
        coordinates: [
          new google.maps.LatLng(51.888774, -2.086056),
          new google.maps.LatLng(51.888746, -2.086011),
          new google.maps.LatLng(51.888730, -2.086036),
          new google.maps.LatLng(51.888710, -2.086003),
          new google.maps.LatLng(51.888702, -2.086016),
          new google.maps.LatLng(51.888663, -2.085953),
          new google.maps.LatLng(51.888669, -2.085940),
          new google.maps.LatLng(51.888642, -2.085897),
          new google.maps.LatLng(51.888680, -2.085838),
          new google.maps.LatLng(51.888685, -2.085846),
          new google.maps.LatLng(51.888712, -2.085802),
          new google.maps.LatLng(51.888733, -2.085834),
          new google.maps.LatLng(51.888757, -2.085796),
          new google.maps.LatLng(51.888795, -2.085859),
          new google.maps.LatLng(51.888770, -2.085900),
          new google.maps.LatLng(51.888793, -2.085937)
        ],
        fillColor: "#fff",
        strokeColor: "#ccc"
      },
      {
        building: 5,
        coordinates: [
          new google.maps.LatLng(51.887396, -2.086737),
          new google.maps.LatLng(51.887361, -2.086513),
          new google.maps.LatLng(51.887516, -2.086451),
          new google.maps.LatLng(51.887544, -2.086629),
          new google.maps.LatLng(51.887488, -2.086653),
          new google.maps.LatLng(51.887494, -2.086696)
        ],
        fillColor: "#fff",
        strokeColor: "#ccc"
      },
      {
        building: 6,
        coordinates: [
          new google.maps.LatLng(51.886332, -2.090723),
          new google.maps.LatLng(51.886266, -2.090865),
          new google.maps.LatLng(51.886122, -2.090687),
          new google.maps.LatLng(51.886096, -2.090741),
          new google.maps.LatLng(51.886082, -2.090721),
          new google.maps.LatLng(51.886194, -2.090486),
          new google.maps.LatLng(51.886223, -2.090520),
          new google.maps.LatLng(51.886253, -2.090458),
          new google.maps.LatLng(51.886300, -2.090518),
          new google.maps.LatLng(51.886252, -2.090621)
        ],
        fillColor: "#fff",
        strokeColor: "#ccc"
      },
      {
        building: 7,
        coordinates: [
          new google.maps.LatLng(51.887568, -2.088938),
          new google.maps.LatLng(51.887444, -2.088822),
          new google.maps.LatLng(51.887462, -2.088771),
          new google.maps.LatLng(51.887457, -2.088763),
          new google.maps.LatLng(51.887536, -2.088543),
          new google.maps.LatLng(51.887550, -2.088555),
          new google.maps.LatLng(51.887567, -2.088509),
          new google.maps.LatLng(51.887684, -2.088620),
          new google.maps.LatLng(51.887665, -2.088674),
          new google.maps.LatLng(51.887671, -2.088682),
          new google.maps.LatLng(51.887646, -2.088755),
          new google.maps.LatLng(51.887656, -2.088767),
          new google.maps.LatLng(51.887639, -2.088818),
          new google.maps.LatLng(51.887628, -2.088808),
          new google.maps.LatLng(51.887594, -2.088897),
          new google.maps.LatLng(51.887587, -2.088889)
        ],
        fillColor: "#fff",
        strokeColor: "#ccc"
      },
      {
        building: 8,
        coordinates: [
          new google.maps.LatLng(51.888338, -2.089143),
          new google.maps.LatLng(51.888309, -2.089245),
          new google.maps.LatLng(51.888270, -2.089216),
          new google.maps.LatLng(51.888271, -2.089210),
          new google.maps.LatLng(51.888214, -2.089167),
          new google.maps.LatLng(51.888239, -2.089077),
          new google.maps.LatLng(51.888296, -2.089119),
          new google.maps.LatLng(51.888299, -2.089112)
        ],
        fillColor: "#fff",
        strokeColor: "#ccc"
      },
      {
        building: 9,
        coordinates: [
          new google.maps.LatLng(51.887961, -2.087301),
          new google.maps.LatLng(51.887977, -2.087138),
          new google.maps.LatLng(51.887968, -2.087135),
          new google.maps.LatLng(51.887970, -2.087105),
          new google.maps.LatLng(51.887862, -2.087077),
          new google.maps.LatLng(51.887842, -2.087275),
          new google.maps.LatLng(51.887871, -2.087283),
          new google.maps.LatLng(51.887864, -2.087349),
          new google.maps.LatLng(51.887947, -2.087372),
          new google.maps.LatLng(51.887955, -2.087299)
        ],
        fillColor: "#fff",
        strokeColor: "#ccc"
      },
      {
        building: 10,
        coordinates: [
          new google.maps.LatLng(51.888191, -2.088077),
          new google.maps.LatLng(51.888088, -2.088052),
          new google.maps.LatLng(51.888105, -2.087888),
          new google.maps.LatLng(51.888206, -2.087912)
        ],
        fillColor: "#fff",
        strokeColor: "#ccc"
      },
      {
        building: 11,
        coordinates: [
          new google.maps.LatLng(51.887681, -2.087453),
          new google.maps.LatLng(51.887679, -2.087481),
          new google.maps.LatLng(51.887637, -2.087809),
          new google.maps.LatLng(51.887572, -2.087793),
          new google.maps.LatLng(51.887567, -2.087848),
          new google.maps.LatLng(51.887516, -2.087835),
          new google.maps.LatLng(51.887521, -2.087780),
          new google.maps.LatLng(51.887482, -2.087770),
          new google.maps.LatLng(51.887447, -2.087754),
          new google.maps.LatLng(51.887417, -2.087736),
          new google.maps.LatLng(51.887381, -2.087711),
          new google.maps.LatLng(51.887350, -2.087681),
          new google.maps.LatLng(51.887321, -2.087651),
          new google.maps.LatLng(51.887458, -2.087365),
          new google.maps.LatLng(51.887485, -2.087390),
          new google.maps.LatLng(51.887536, -2.087418)
        ],
        fillColor: "#fff",
        strokeColor: "#ccc"
      },
      {
        building: 12,
        coordinates: [
          new google.maps.LatLng(51.887921, -2.088031),
          new google.maps.LatLng(51.887853, -2.088209),
          new google.maps.LatLng(51.887864, -2.088220),
          new google.maps.LatLng(51.887810, -2.088363),
          new google.maps.LatLng(51.887817, -2.088369),
          new google.maps.LatLng(51.887796, -2.088427),
          new google.maps.LatLng(51.887790, -2.088422),
          new google.maps.LatLng(51.887782, -2.088441),
          new google.maps.LatLng(51.887623, -2.088287),
          new google.maps.LatLng(51.887643, -2.088234),
          new google.maps.LatLng(51.887620, -2.088211),
          new google.maps.LatLng(51.887562, -2.088191),
          new google.maps.LatLng(51.887606, -2.087830),
          new google.maps.LatLng(51.887695, -2.087853),
          new google.maps.LatLng(51.887664, -2.088085),
          new google.maps.LatLng(51.887689, -2.088109),
          new google.maps.LatLng(51.887753, -2.087935),
          new google.maps.LatLng(51.887729, -2.087912),
          new google.maps.LatLng(51.887748, -2.087863),
          new google.maps.LatLng(51.887829, -2.087941),
          new google.maps.LatLng(51.887840, -2.087913),
          new google.maps.LatLng(51.887900, -2.087973),
          new google.maps.LatLng(51.887891, -2.088000)
        ],
        fillColor: "#fff",
        strokeColor: "#ccc"
      },
      {
        building: 13,
        coordinates: [
          new google.maps.LatLng(51.887964, -2.087615),
          new google.maps.LatLng(51.888012, -2.087627),
          new google.maps.LatLng(51.888018, -2.087576),
          new google.maps.LatLng(51.888128, -2.087602),
          new google.maps.LatLng(51.888140, -2.087584),
          new google.maps.LatLng(51.888156, -2.087609),
          new google.maps.LatLng(51.888167, -2.087593),
          new google.maps.LatLng(51.888182, -2.087617),
          new google.maps.LatLng(51.888194, -2.087600),
          new google.maps.LatLng(51.888212, -2.087626),
          new google.maps.LatLng(51.888223, -2.087608),
          new google.maps.LatLng(51.888238, -2.087631),
          new google.maps.LatLng(51.888250, -2.087613),
          new google.maps.LatLng(51.888266, -2.087637),
          new google.maps.LatLng(51.888276, -2.087622),
          new google.maps.LatLng(51.888293, -2.087648),
          new google.maps.LatLng(51.888289, -2.087688),
          new google.maps.LatLng(51.888336, -2.087700),
          new google.maps.LatLng(51.888312, -2.087957),
          new google.maps.LatLng(51.888236, -2.087937),
          new google.maps.LatLng(51.888241, -2.087865),
          new google.maps.LatLng(51.888189, -2.087853),
          new google.maps.LatLng(51.888184, -2.087905),
          new google.maps.LatLng(51.888125, -2.087892),
          new google.maps.LatLng(51.888130, -2.087837),
          new google.maps.LatLng(51.887995, -2.087803),
          new google.maps.LatLng(51.888004, -2.087716),
          new google.maps.LatLng(51.887957, -2.087704)
        ],
        fillColor: "#fff",
        strokeColor: "#ccc"
      },
      {
        building: 14,
        coordinates: [
          new google.maps.LatLng(51.888472, -2.087345),
          new google.maps.LatLng(51.888334, -2.087308),
          new google.maps.LatLng(51.888343, -2.087219),
          new google.maps.LatLng(51.888333, -2.087216),
          new google.maps.LatLng(51.888345, -2.087103),
          new google.maps.LatLng(51.888366, -2.087109),
          new google.maps.LatLng(51.888369, -2.087093),
          new google.maps.LatLng(51.888494, -2.087125)
        ],
        fillColor: "#fff",
        strokeColor: "#ccc"
      },
      {
        building: 15,
        coordinates: [
          new google.maps.LatLng(51.888495, -2.087516),
          new google.maps.LatLng(51.888457, -2.087921),
          new google.maps.LatLng(51.888423, -2.087914),
          new google.maps.LatLng(51.888420, -2.087947),
          new google.maps.LatLng(51.888429, -2.087949),
          new google.maps.LatLng(51.888426, -2.087994),
          new google.maps.LatLng(51.888437, -2.087997),
          new google.maps.LatLng(51.888434, -2.088031),
          new google.maps.LatLng(51.888423, -2.088029),
          new google.maps.LatLng(51.888421, -2.088053),
          new google.maps.LatLng(51.888431, -2.088055),
          new google.maps.LatLng(51.888428, -2.088090),
          new google.maps.LatLng(51.888417, -2.088088),
          new google.maps.LatLng(51.888413, -2.088120),
          new google.maps.LatLng(51.888401, -2.088118),
          new google.maps.LatLng(51.888377, -2.088363),
          new google.maps.LatLng(51.888306, -2.088346),
          new google.maps.LatLng(51.888304, -2.088361),
          new google.maps.LatLng(51.888240, -2.088344),
          new google.maps.LatLng(51.888264, -2.088093),
          new google.maps.LatLng(51.888299, -2.088101),
          new google.maps.LatLng(51.888357, -2.087481)
        ],
        fillColor: "#fff",
        strokeColor: "#ccc"
      },
      {
        building: 16,
        coordinates: [
          new google.maps.LatLng(51.887174, -2.087387),
          new google.maps.LatLng(51.887095, -2.087455),
          new google.maps.LatLng(51.887101, -2.087476),
          new google.maps.LatLng(51.887067, -2.087506),
          new google.maps.LatLng(51.887060, -2.087486),
          new google.maps.LatLng(51.886968, -2.087565),
          new google.maps.LatLng(51.886933, -2.087462),
          new google.maps.LatLng(51.886925, -2.087469),
          new google.maps.LatLng(51.886927, -2.087478),
          new google.maps.LatLng(51.886920, -2.087483),
          new google.maps.LatLng(51.886860, -2.087303),
          new google.maps.LatLng(51.886868, -2.087296),
          new google.maps.LatLng(51.886871, -2.087305),
          new google.maps.LatLng(51.886879, -2.087297),
          new google.maps.LatLng(51.886846, -2.087195),
          new google.maps.LatLng(51.887251, -2.086846),
          new google.maps.LatLng(51.887374, -2.087219),
          new google.maps.LatLng(51.887394, -2.087268),
          new google.maps.LatLng(51.887413, -2.087304),
          new google.maps.LatLng(51.887434, -2.087335),
          new google.maps.LatLng(51.887458, -2.087365),
          new google.maps.LatLng(51.887321, -2.087651),
          new google.maps.LatLng(51.887309, -2.087639),
          new google.maps.LatLng(51.887272, -2.087589),
          new google.maps.LatLng(51.887266, -2.087591),
          new google.maps.LatLng(51.887257, -2.087590),
          new google.maps.LatLng(51.887249, -2.087585),
          new google.maps.LatLng(51.887243, -2.087576),
          new google.maps.LatLng(51.887239, -2.087565),
          new google.maps.LatLng(51.887237, -2.087555),
          new google.maps.LatLng(51.887238, -2.087541),
          new google.maps.LatLng(51.887239, -2.087533),
          new google.maps.LatLng(51.887211, -2.087476)
        ],
        fillColor: "#fff",
        strokeColor: "#ccc"
      },
      {
        building: 17,
        coordinates: [
          new google.maps.LatLng(51.888318, -2.088783),
          new google.maps.LatLng(51.888329, -2.088677),
          new google.maps.LatLng(51.888275, -2.088663),
          new google.maps.LatLng(51.888296, -2.088463),
          new google.maps.LatLng(51.888347, -2.088475),
          new google.maps.LatLng(51.888357, -2.088373),
          new google.maps.LatLng(51.888186, -2.088330),
          new google.maps.LatLng(51.888174, -2.088456),
          new google.maps.LatLng(51.888155, -2.088452),
          new google.maps.LatLng(51.888140, -2.088606),
          new google.maps.LatLng(51.888159, -2.088611),
          new google.maps.LatLng(51.888147, -2.088740)
        ],
        fillColor: "#fff",
        strokeColor: "#ccc"
      }
    ];

    this._roomPolygons = [
      {
        room: "WW001",
        coordinates: [
          new google.maps.LatLng(51.888347, -2.088475),
          new google.maps.LatLng(51.888357, -2.088373),
          new google.maps.LatLng(51.888186, -2.088330),
          new google.maps.LatLng(51.888176, -2.088432)
        ],
        description: "<img src='assets/images/rooms/ww001.jpg' alt='WW001' class='description-image'><p class='description-text'>The Zone features comfortable seating including booths with provided charging points for a pleasant, relaxed, and constructive working environment.</p>",
        fillColor: "#fff8eb",
        strokeColor: "#b8aca2"
      },
      {
        room: "WW002",
        coordinates: [
          new google.maps.LatLng(51.888201, -2.088754),
          new google.maps.LatLng(51.888227, -2.088469),
          new google.maps.LatLng(51.888154, -2.088452),
          new google.maps.LatLng(51.888140, -2.088606),
          new google.maps.LatLng(51.888159, -2.088611),
          new google.maps.LatLng(51.888147, -2.088740)
        ],
        description: "<p class='description-text'>This room hosts computing lectures and laboratory sessions. Specialist game development lectures are also primarily held here.</p>",
        fillColor: "#fff8eb",
        strokeColor: "#b8aca2"
      },
      {
        room: "WW003",
        coordinates: [
          new google.maps.LatLng(51.888319, -2.088783),
          new google.maps.LatLng(51.888329, -2.088677),
          new google.maps.LatLng(51.888256, -2.088659),
          new google.maps.LatLng(51.888253, -2.088690),
          new google.maps.LatLng(51.888208, -2.088678),
          new google.maps.LatLng(51.888201, -2.088754)
        ],
        description: "<p class='description-text'>This room hosts computing lectures and laboratory sessions. It also acts as the secondary room for game development sessions.</p>",
        fillColor: "#fff8eb",
        strokeColor: "#b8aca2"
      },
      {
        room: "WW004",
        coordinates: [
          new google.maps.LatLng(51.888275, -2.088663),
          new google.maps.LatLng(51.888279, -2.088623),
          new google.maps.LatLng(51.888250, -2.088615),
          new google.maps.LatLng(51.888246, -2.088656)
        ],
        description: "<p class='description-text'>This room is the smaller recording studio on the ground floor of the Waterworth Building.</p>",
        fillColor: "#fff8eb",
        strokeColor: "#b8aca2"
      },
      {
        room: "WW005",
        coordinates: [
          new google.maps.LatLng(51.888235, -2.088653),
          new google.maps.LatLng(51.888239, -2.088613),
          new google.maps.LatLng(51.888250, -2.088615),
          new google.maps.LatLng(51.888246, -2.088656)
        ],
        description: "<p class='description-text'>This room acts as a storage room for the Waterworth Building.</p>",
        fillColor: "#fff8eb",
        strokeColor: "#b8aca2"
      },
      {
        room: "WW006",
        coordinates: [
          new google.maps.LatLng(51.888279, -2.088623),
          new google.maps.LatLng(51.888284, -2.088570),
          new google.maps.LatLng(51.888244, -2.088560),
          new google.maps.LatLng(51.888239, -2.088613)
        ],
        description: "<p class='description-text'>This room is the larger recording studio on the ground floor of the Waterworth Building.</p>",
        fillColor: "#fff8eb",
        strokeColor: "#b8aca2"
      },
      {
        room: "WW011",
        coordinates: [
          new google.maps.LatLng(51.888291, -2.088507),
          new google.maps.LatLng(51.888296, -2.088462),
          new google.maps.LatLng(51.888254, -2.088452),
          new google.maps.LatLng(51.888250, -2.088497)
        ],
        description: "<p class='description-text'>The unisex bathrooms in the Waterworth Building are spacious and contain all the necessary amenities.</p>",
        fillColor: "#eee5f8",
        strokeColor: "#d4c1eb"
      },
      {
        room: "WW101",
        coordinates: [
          new google.maps.LatLng(51.888213, -2.088622),
          new google.maps.LatLng(51.888240, -2.088344),
          new google.maps.LatLng(51.888186, -2.088330),
          new google.maps.LatLng(51.888174, -2.088456),
          new google.maps.LatLng(51.888154, -2.088452),
          new google.maps.LatLng(51.888140, -2.088606),
          new google.maps.LatLng(51.888160, -2.088611)
        ],
        description: "<p class='description-text'>This room hosts computing lectures and laboratory sessions. Due to the size of the room, a folding divider has been installed which can be used to separate the room into two.</p>",
        fillColor: "#fff8eb",
        strokeColor: "#b8aca2"
      },
      {
        room: "WW103",
        coordinates: [
          new google.maps.LatLng(51.888319, -2.088783),
          new google.maps.LatLng(51.888329, -2.088677),
          new google.maps.LatLng(51.888211, -2.088647),
          new google.maps.LatLng(51.888213, -2.088622),
          new google.maps.LatLng(51.888159, -2.088611),
          new google.maps.LatLng(51.888147, -2.088740)
        ],
        description: "<img src='assets/images/rooms/ww103.jpg' alt='WW103' class='description-image'><p class='description-text'>This room is an office for members of staff. It features some recreational facilities, such as a kitchenette.</p>",
        fillColor: "#fff8eb",
        strokeColor: "#b8aca2"
      },
      {
        room: "WW104",
        coordinates: [
          new google.maps.LatLng(51.888275, -2.088663),
          new google.maps.LatLng(51.888235, -2.088653),
          new google.maps.LatLng(51.888244, -2.088560),
          new google.maps.LatLng(51.888284, -2.088570)
        ],
        description: "<p class='description-text'>This room is a smaller office to be used by a couple of members of staff at any one time.</p>",
        fillColor: "#fff8eb",
        strokeColor: "#b8aca2"
      },
      {
        room: "WW113",
        coordinates: [
          new google.maps.LatLng(51.888291, -2.088507),
          new google.maps.LatLng(51.888296, -2.088462),
          new google.maps.LatLng(51.888254, -2.088452),
          new google.maps.LatLng(51.888250, -2.088497)
        ],
        description: "<p class='description-text'>The unisex bathrooms in the Waterworth Building are spacious and contain all the necessary amenities.</p>",
        fillColor: "#eee5f8",
        strokeColor: "#d4c1eb"
      },
      {
        room: "WW114",
        coordinates: [
          new google.maps.LatLng(51.888347, -2.088475),
          new google.maps.LatLng(51.888357, -2.088373),
          new google.maps.LatLng(51.888264, -2.088350),
          new google.maps.LatLng(51.888254, -2.088452)
        ],
        description: "<img src='assets/images/rooms/ww114.jpg' alt='WW114' class='description-image'><p class='description-text'>This room hosts computing lectures and laboratory sessions. Specialist forensic computing lectures are also primarily held here.</p>",
        fillColor: "#fff8eb",
        strokeColor: "#b8aca2"
      }
    ];
  }

  get buildingPolygons(): {building: Number, coordinates: {}[], fillColor: String, strokeColor: String}[] {
    return this._buildingPolygons;
  }

  get roomPolygons(): {room: String, coordinates: {}[], description: String, fillColor: String, strokeColor: String}[] {
    return this._roomPolygons;
  }
}
