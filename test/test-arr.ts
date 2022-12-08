import { genRandomId } from "../functions/others/gen-random-id";
import modList from "../interface/modList";

const test_arr: modList[] = [
  {
    id:genRandomId(),
    name: "arr",
    dependency: [
      {
        id:genRandomId(),
        name: "arr",
        dependency: [
          {
            id:genRandomId(),
            name: "arr",
            dependency: [
              {
                id:genRandomId(),
                name: "arr",
                dependency: [
                  {
                    id:genRandomId(),
                    name: "arr",
                    dependency: [
                      {
                        id:genRandomId(),
                        name: "arr",
                        dependency: [
                          {
                            id:genRandomId(),
                            name: "arr",
                            dependency: [
                              {
                                id:genRandomId(),
                                name: "arr",
                                dependency: [
                                  {
                                    id:genRandomId(),
                                    name: "arr",
                                    dependency: [
                                      {
                                        id:genRandomId(),
                                        name: "arr",
                                        dependency: [
                                          {
                                            id:genRandomId(),
                                            name: "arr",
                                            dependency: [
                                              {
                                                id:genRandomId(),
                                                name: "arr",
                                                dependency: [
                                                  {
                                                    id:genRandomId(),
                                                    name: "arr",
                                                    dependency: [],
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                      { id:genRandomId(),
                                        name: "arr", dependency: [] },
                                    ],
                                  },
                                ],
                              },
                              {
                                id:genRandomId(),
                                name: "arr",
                                dependency: [
                                  { id:genRandomId(),
                                    name: "arr", dependency: [] },
                                  { id:genRandomId(),
                                    name: "arr", dependency: [] },
                                  { id:genRandomId(),
                                    name: "arr", dependency: [] },
                                ],
                              },
                            ],
                          },
                          {
                            id:genRandomId(),
                            name: "arr",
                            dependency: [{ 
                                id:genRandomId(),name: "arr", dependency: [] }],
                          },
                        ],
                      },
                      { id:genRandomId(),
                        name: "arr", dependency: [] },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id:genRandomId(),
            name: "arr",
            dependency: [
              {
                id:genRandomId(),
                name: "arr",
                dependency: [
                  { id:genRandomId(),
                    name: "arr", dependency: [] },
                  { id:genRandomId(),
                    name: "arr", dependency: [] },
                  {
                    id:genRandomId(),
                    name: "arr",
                    dependency: [
                      {
                        id:genRandomId(),
                        name: "arr",
                        dependency: [
                          {
                            id:genRandomId(),
                            name: "arr",
                            dependency: [{ 
                                id:genRandomId(),name: "arr", dependency: [] }],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
