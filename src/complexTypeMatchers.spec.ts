describe("Complex object assertions", () => {
    const myObject = {
        myStringProperty: "some-string",
        someNestedThing: {
            nestedNumberProp: 42
        }
    }

    describe("objects", () => {
        describe("plain comparisons", () => {
            it("should let you compare objects using equality", () => {
                expect(myObject).toEqual({
                    myStringProperty: "some-string",
                    someNestedThing: {
                        nestedNumberProp: 42
                    }
                })
            })

            it("should let you compare the same object using identity when they are the actual same", () => {
                expect(myObject).toBe(myObject)
            })

            it("should fail when you compare two same objects using identity when they are not the same", () => {
                // remove .not to make it fail
                expect(myObject).not.toBe({
                    myStringProperty: "some-string",
                    someNestedThing: {
                        nestedNumberProp: 42
                    }
                })
            })
        })

        describe("matching with objectContaining", () => {
            it("should let you describe incomplete objects using toEqual", () => {
                expect(myObject).toEqual(
                    expect.objectContaining({
                        myStringProperty: "some-string"
                    })
                )
            })

            it("should not let you compare for matches using identity matches", () => {
                // remove .not to make it fail
                expect(myObject).not.toBe(
                    expect.objectContaining({
                        myStringProperty: "some-string"
                    })
                )
            })
        })
    })

    describe("arrays", () => {
        describe("plain comparisons", () => {
            it("should let you compare arrays for equality", () => {
                const myArray = [myObject]

                expect(myArray).toEqual([myObject])
            })

            it("should not let you compare arrays for identity", () => {
                const myArray = [myObject]

                // remove .not to make it fail
                expect(myArray).not.toBe([myObject])
            })
        })

        describe("matching with arrayContaining", () => {
            it("should let you match using a subset of the items", () => {
                const things = [
                    "one", "two", "three", 42
                ]

                expect(things).toEqual(
                    expect.arrayContaining(["three"])
                )
            })

            it("should let you match using a simple types", () => {
                const things = [
                    "one", "two", "three"
                ]

                // remove .not to make it fail
                expect(things).not.toEqual(
                    expect.arrayContaining([expect.any(Number)])
                )
            })


        })
    })

    describe("array of objects", () => {
        const myArrayOfThings  = [
            {
                "some-number": 42
            },

            {
                "some-number": 84,
                "and-a-string": "hello world"
            },

            {
                "an-object": {
                    "with-an-object": {
                        "and-a-string-property": "trolololo",
                        "and-another-string-we-dont-care-about": "foobar"
                    },
                    "and-another-thing-we-dont-care-about": "barbaz"
                }
            }
        ]

        it("should let you assert on the simplest thing", () => {
            expect(myArrayOfThings).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        "some-number": 42
                    })
                ])
            )
        })

        it("should let you assert on the simplest thing", () => {
            expect(myArrayOfThings).toEqual(
                expect.arrayContaining([
                    expect.not.objectContaining({
                        "some-number": 43
                    })
                ])
            )
        })

        it("should let you assert on stuff more deeply nested", () => {
            expect(myArrayOfThings).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        "an-object": expect.objectContaining({
                            "with-an-object": expect.objectContaining({
                                "and-a-string-property": "trolololo"
                            })
                        })
                    })
                ])
            )
        })

        it("should let you assert on stuff more deeply nested without being very specific", () => {
            expect(myArrayOfThings).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        "an-object": expect.objectContaining({
                            "with-an-object": expect.objectContaining({
                                "and-a-string-property": expect.any(String)
                            })
                        })
                    })
                ])
            )
        })

        it("should let you assert on stuff more deeply nested and negating based on the type", () => {
            expect(myArrayOfThings).not.toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        "an-object": expect.objectContaining({
                            "with-an-object": expect.objectContaining({
                                "and-a-string-property": expect.any(Number)
                            })
                        })
                    })
                ])
            )
        })
    })
})
