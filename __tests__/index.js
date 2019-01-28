const enhancer = require("../enhancer");

describe("enhancer library", () => {
  describe("success() method", () => {
    const item = {
      originalName: "BF Sword",
      name: "BF Sword",
      type: "weapon",
      durability: 9,
      enhancement: 15
    };

    const expected = {
      originalName: "BF Sword",
      name: "[PRI] BF Sword",
      type: "weapon",
      durability: 9,
      enhancement: 'PRI'
    };

    it("should give me back the same item", () => {
      const actual = enhancer.success(item);

      expect(actual).toEqual(expected);
    });

    it("type should only be armor or weapon", () => {
      expect(item.type).toBe("weapon" || "armor");
    });

    it('if enhancement is < 14, durability cant be below 25', () => {
        if(item.enhancement < 14) {
            expect(item.durability).not.toBeLessThan(25)
        }
    })

    it('if enhancement is >15, durability cant be below 10', () => {
        if(item.enhancement > 14 || NaN) {
            expect(item.durability).not.toBeLessThan(10)
        }
    })
  });

  describe('fail() method', () => {
    const item = {
        originalName: "BF Sword",
        name: "BF Sword",
        type: "weapon",
        durability: 100,
        enhancement: 'PEN'
      };
      const expected = {
        originalName: "BF Sword",
        name: "[TET] BF Sword",
        type: "weapon",
        durability: 90,
        enhancement: 'TET'
      };

      it('should decrease durability by 5 if enhancement is between 0-14 and by 10 if between 15-PEN', () => {
          const actual = enhancer.fail(item);
          expect(actual).toEqual(expected)
      })
  })
});
