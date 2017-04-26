import {Injectable} from '@angular/core';

declare let google;

@Injectable()
export class PolygonProvider {
  private _buildingPolygons: {building: Number, color: String, coordinates: {}[]}[];

  constructor() {
    this._buildingPolygons = [
      {
        building: 1,
        color: "",
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
        ]
      },
      {
        building: 2,
        color: "",
        coordinates: [
          new google.maps.LatLng(51.885804, -2.090255),
          new google.maps.LatLng(51.885754, -2.090370),
          new google.maps.LatLng(51.885695, -2.090302),
          new google.maps.LatLng(51.885744, -2.090187)
        ]
      },
      {
        building: 3,
        color: "",
        coordinates: [
          new google.maps.LatLng(51.886674, -2.087231),
          new google.maps.LatLng(51.886622, -2.087344),
          new google.maps.LatLng(51.886628, -2.087353),
          new google.maps.LatLng(51.886585, -2.087444),
          new google.maps.LatLng(51.886462, -2.087291),
          new google.maps.LatLng(51.886559, -2.087086)
        ]
      },
      {
        building: 4,
        color: "",
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
        ]
      },
      {
        building: 5,
        color: "",
        coordinates: [
          new google.maps.LatLng(51.887396, -2.086737),
          new google.maps.LatLng(51.887361, -2.086513),
          new google.maps.LatLng(51.887516, -2.086451),
          new google.maps.LatLng(51.887544, -2.086629),
          new google.maps.LatLng(51.887488, -2.086653),
          new google.maps.LatLng(51.887494, -2.086696)
        ]
      },
      {
        building: 6,
        color: "",
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
        ]
      },
      {
        building: 7,
        color: "",
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
        ]
      },
      {
        building: 8,
        color: "",
        coordinates: [
          new google.maps.LatLng(51.888338, -2.089143),
          new google.maps.LatLng(51.888309, -2.089245),
          new google.maps.LatLng(51.888270, -2.089216),
          new google.maps.LatLng(51.888271, -2.089210),
          new google.maps.LatLng(51.888214, -2.089167),
          new google.maps.LatLng(51.888239, -2.089077),
          new google.maps.LatLng(51.888296, -2.089119),
          new google.maps.LatLng(51.888299, -2.089112)
        ]
      },
      {
        building: 9,
        color: "",
        coordinates: [
          new google.maps.LatLng(51.88796, -2.08730),
          new google.maps.LatLng(51.88798, -2.08714),
          new google.maps.LatLng(51.88797, -2.08713),
          new google.maps.LatLng(51.88797, -2.08710),
          new google.maps.LatLng(51.88786, -2.08708),
          new google.maps.LatLng(51.88784, -2.08728),
          new google.maps.LatLng(51.88787, -2.08728),
          new google.maps.LatLng(51.88786, -2.08735),
          new google.maps.LatLng(51.88795, -2.08737),
          new google.maps.LatLng(51.88795, -2.08730)
        ]
      },
      {
        building: 10,
        color: "",
        coordinates: [
          new google.maps.LatLng(51.88819, -2.08808),
          new google.maps.LatLng(51.88809, -2.08805),
          new google.maps.LatLng(51.88810, -2.08789),
          new google.maps.LatLng(51.88821, -2.08791)
        ]
      },
      {
        building: 12,
        color: "",
        coordinates: [
          new google.maps.LatLng(51.88792, -2.08803),
          new google.maps.LatLng(51.88785, -2.08821),
          new google.maps.LatLng(51.88786, -2.08822),
          new google.maps.LatLng(51.88781, -2.08836),
          new google.maps.LatLng(51.88782, -2.08837),
          new google.maps.LatLng(51.88780, -2.08843),
          new google.maps.LatLng(51.88779, -2.08842),
          new google.maps.LatLng(51.88778, -2.08844),
          new google.maps.LatLng(51.88762, -2.08829),
          new google.maps.LatLng(51.88764, -2.08823),
          new google.maps.LatLng(51.88762, -2.08821),
          new google.maps.LatLng(51.88756, -2.08819),
          new google.maps.LatLng(51.88761, -2.08783),
          new google.maps.LatLng(51.88770, -2.08785),
          new google.maps.LatLng(51.88766, -2.08809),
          new google.maps.LatLng(51.88769, -2.08811),
          new google.maps.LatLng(51.88775, -2.08794),
          new google.maps.LatLng(51.88773, -2.08791),
          new google.maps.LatLng(51.88775, -2.08786),
          new google.maps.LatLng(51.88783, -2.08794),
          new google.maps.LatLng(51.88784, -2.08791),
          new google.maps.LatLng(51.88790, -2.08797),
          new google.maps.LatLng(51.88789, -2.08800)
        ]
      },
      {
        building: 13,
        color: "",
        coordinates: [
          new google.maps.LatLng(51.88796, -2.08761),
          new google.maps.LatLng(51.88801, -2.08763),
          new google.maps.LatLng(51.88802, -2.08757),
          new google.maps.LatLng(51.88813, -2.08760),
          new google.maps.LatLng(51.88814, -2.08758),
          new google.maps.LatLng(51.88816, -2.08761),
          new google.maps.LatLng(51.88817, -2.08759),
          new google.maps.LatLng(51.88818, -2.08762),
          new google.maps.LatLng(51.88819, -2.08760),
          new google.maps.LatLng(51.88821, -2.08763),
          new google.maps.LatLng(51.88822, -2.08761),
          new google.maps.LatLng(51.88824, -2.08763),
          new google.maps.LatLng(51.88825, -2.08761),
          new google.maps.LatLng(51.88827, -2.08764),
          new google.maps.LatLng(51.88828, -2.08762),
          new google.maps.LatLng(51.88829, -2.08765),
          new google.maps.LatLng(51.88829, -2.08769),
          new google.maps.LatLng(51.88834, -2.08770),
          new google.maps.LatLng(51.88831, -2.08796),
          new google.maps.LatLng(51.88824, -2.08794),
          new google.maps.LatLng(51.88824, -2.08787),
          new google.maps.LatLng(51.88819, -2.08785),
          new google.maps.LatLng(51.88818, -2.08790),
          new google.maps.LatLng(51.88812, -2.08789),
          new google.maps.LatLng(51.88813, -2.08784),
          new google.maps.LatLng(51.88800, -2.08780),
          new google.maps.LatLng(51.88800, -2.08772),
          new google.maps.LatLng(51.88796, -2.08770)
        ]
      },
      {
        building: 14,
        color: "",
        coordinates: [
          new google.maps.LatLng(51.88847, -2.08735),
          new google.maps.LatLng(51.88833, -2.08731),
          new google.maps.LatLng(51.88834, -2.08722),
          new google.maps.LatLng(51.88833, -2.08722),
          new google.maps.LatLng(51.88834, -2.08710),
          new google.maps.LatLng(51.88837, -2.08711),
          new google.maps.LatLng(51.88837, -2.08709),
          new google.maps.LatLng(51.88849, -2.08712)
        ]
      },
      {
        building: 15,
        color: "",
        coordinates: [
          new google.maps.LatLng(51.88850, -2.08752),
          new google.maps.LatLng(51.88846, -2.08792),
          new google.maps.LatLng(51.88842, -2.08791),
          new google.maps.LatLng(51.88842, -2.08795),
          new google.maps.LatLng(51.88843, -2.08795),
          new google.maps.LatLng(51.88843, -2.08799),
          new google.maps.LatLng(51.88844, -2.08800),
          new google.maps.LatLng(51.88843, -2.08803),
          new google.maps.LatLng(51.88842, -2.08803),
          new google.maps.LatLng(51.88842, -2.08805),
          new google.maps.LatLng(51.88843, -2.08806),
          new google.maps.LatLng(51.88843, -2.08809),
          new google.maps.LatLng(51.88842, -2.08809),
          new google.maps.LatLng(51.88841, -2.08812),
          new google.maps.LatLng(51.88840, -2.08812),
          new google.maps.LatLng(51.88838, -2.08836),
          new google.maps.LatLng(51.88831, -2.08835),
          new google.maps.LatLng(51.88831, -2.08836),
          new google.maps.LatLng(51.88824, -2.08834),
          new google.maps.LatLng(51.88826, -2.08809),
          new google.maps.LatLng(51.88830, -2.08810),
          new google.maps.LatLng(51.88836, -2.08748)
        ]
      }
    ];
  }

  get buildingPolygons(): {building: Number, color: String, coordinates: {}[]}[] {
    return this._buildingPolygons;
  }
}
