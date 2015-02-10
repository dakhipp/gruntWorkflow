angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/character-selector.html',
    "<div id=\"character-selector\" ng-cloak ng-hide=\"editing\">\n" +
    "  <div class=\"wrapper\">\n" +
    "    <div id=\"unit-groupings\">\n" +
    "      <div class=\"unit-type\" ng-repeat=\"(type, group) in unitGroupings\">\n" +
    "        <div class=\"title\">{{ type }}</div>\n" +
    "        <ul class=\"classes\">\n" +
    "          <li class=\"character {{ unit.name }}\" ng-repeat=\"unit in group\" ng-click=\"assignUnitToNextAvailableLoadoutSlot(unit)\">\n" +
    "            <div class=\"title\">{{ unit.name }}</div>\n" +
    "            <div class=\"portrait\"></div>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('views/loadout.html',
    "<div id=\"loadout\" ng-cloak>\n" +
    "  <div class=\"wrapper\">\n" +
    "    <ul id=\"selected-characters\">\n" +
    "      <li ng-repeat=\"unit in units\" class=\"character {{ unit.name }}\" ng-click=\"edit(unit)\">\n" +
    "        <div class=\"title\">{{ unit.name }}</div>\n" +
    "        <div class=\"portrait\">\n" +
    "          <span class=\"help-text\" ng-hide=\"isChosen($index)\">Click a unit below</span>\n" +
    "        </div>\n" +
    "        <span class=\"remove\" show-if-unit-has-stats-when-parent-is-hovered ng-click=\"clearUnit(unit)\">&times;</span>\n" +
    "        <ul class=\"stats-overlay\">\n" +
    "          <li class=\"armor\">{{ statsOrEmpty(unit, \"armor\") }}</li>\n" +
    "          <li class=\"strength\">{{ statsOrEmpty(unit, \"strength\") }}</li>\n" +
    "          <li class=\"willpower\">{{ statsOrEmpty(unit, \"willpower\") }}</li>\n" +
    "          <li class=\"exertion\">{{ statsOrEmpty(unit, \"exertion\") }}</li>\n" +
    "          <li class=\"break\">{{ statsOrEmpty(unit, \"break\") }}</li>\n" +
    "        </ul>\n" +
    "        <span class=\"move-left\" show-if-unit-has-stats-when-parent-is-hovered position=\"0\" ng-click=\"moveUnit(unit, $index, -1, $event)\"></span>\n" +
    "        <span class=\"move-right\" show-if-unit-has-stats-when-parent-is-hovered position=\"5\" ng-click=\"moveUnit(unit, $index, 1, $event)\"></span>\n" +
    "        <div class=\"allocated-max-stats\">\n" +
    "          <span class=\"allocated\">{{ unit.allocated_stat_points }}</span>/<span class=\"max\">{{ unit.max_stat_points }}</span>\n" +
    "        </div>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('views/stat-editor.html',
    "<div id=\"stat-editor\" ng-cloak ng-show=\"editing\">\n" +
    "  <div class=\"wrapper\">\n" +
    "    <div class=\"title-and-controls\">\n" +
    "      <div class=\"title\">{{ unit.name }} - (rank <span class=\"rank\">{{ unit.rank }}</span>)</div>\n" +
    "      <div class=\"controls\">\n" +
    "        <span class=\"done\" ng-click=\"doneEditing()\">Done Editing</span>\n" +
    "        <span class=\"reset\">Reset to Minimums</span>\n" +
    "        <span class=\"total\">\n" +
    "          <span class=\"allocated\">{{ unit.allocated_stat_points }}</span>/<span class=\"max\">{{ unit.max_stat_points }}</span>\n" +
    "        </span>\n" +
    "        <span id=\"rank-changer\" class=\"rank{{ unit.rank }}\">\n" +
    "          <span class=\"ui-title\">Rank</span>\n" +
    "          <span class=\"set-rank-1 change-rank\">1</span><span class=\"set-rank-2 change-rank\">2</span><span class=\"set-rank-3 change-rank\">3</span>\n" +
    "        </span>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"portrait {{ unit.name }}\"></div>\n" +
    "\n" +
    "    <ul class=\"stats\">\n" +
    "      <li class=\"{{ stat.name }}\" ng-repeat=\"stat in unit.stats\" ng-controller=\"StatChange\">\n" +
    "        <span class=\"current\">{{ stat.current }}</span>/<span class=\"max\">{{ stat.max }}</span>\n" +
    "        <span class=\"icon\" disable-context-menu ng-mousedown=\"increaseOrDecrease(unit, stat, $event)\"></span>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "</div>\n"
  );

}]);
