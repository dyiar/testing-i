const enhancer = require("../enhancer");

describe("enhancer library", () => {
  describe("success() method", () => {
    const item = {
      originalName: "BF Sword",
      name: "BF Sword",
      type: "weapon",
      durability: 50,
      enhancement: 'PEN'
    };

    const expected = {
      originalName: "BF Sword",
      name: "[PEN] BF Sword",
      type: "weapon",
      durability: 50,
      enhancement: 'PEN'
    };

    it("should give me back the same item", () => {
      const actual = enhancer.success(item);

      expect(actual).toEqual(expected);
    });

    it("type should only be armor or weapon", () => {
      expect(item.type).toBe("weapon" || "armor");
    });

    it("if enhancement is < 14, durability cant be below 25", () => {
      if (item.enhancement < 14) {
        expect(item.durability).not.toBeLessThan(25);
      }
    });

    it("if enhancement is >15, durability cant be below 10", () => {
      if (item.enhancement > 14 || NaN) {
        expect(item.durability).not.toBeLessThan(10);
      }
    });

    it("expects durability cant be more than 100", () => {
      expect(item.durability).not.toBeGreaterThan(100);
    });

    // it("should not let enhancement go below 0 or above PEN", () => {
    //     expect(item.enhancement).toBe(
    //       "PRI" || "DUO" || "TRI" || "TET" || "PEN" || 1 || 2 || 3 || 4 || 5 || 6 || 7 || 8 || 9 || 10 || 11 || 12 || 13 || 14 || 15
    //     )
    // });
  });

  describe("fail() method", () => {
    const item = {
      originalName: "BF Sword",
      name: "BF Sword",
      type: "weapon",
      durability: 100,
      enhancement: "PEN"
    };
    const expected = {
      originalName: "BF Sword",
      name: "[TET] BF Sword",
      type: "weapon",
      durability: 90,
      enhancement: "TET"
    };

    it("should decrease durability by 5 if enhancement is between 0-14 and by 10 if between 15-PEN", () => {
      const actual = enhancer.fail(item);
      expect(actual).toEqual(expected);
    });
  });

  describe("repair() method", () => {
    const item = {
      originalName: "BF Sword",
      name: "BF Sword",
      type: "weapon",
      durability: 50,
      enhancement: 12
    };

    const expected = {
      originalName: "BF Sword",
      name: "[+12] BF Sword",
      type: "weapon",
      durability: 100,
      enhancement: 12
    };

    it("should bring durability back to 100", () => {
      const actual = enhancer.repair(item);
      expect(actual).toEqual(expected);
    });
  });
});
