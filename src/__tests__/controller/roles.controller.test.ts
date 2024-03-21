// import { getRoles, getRole, postRole, putRole, deleteRole } from '../../controllers/roles.controller';
// import { rolesModel } from '../../models/roles.model';
//
// jest.mock('../models/roles.model');
// jest.mock('../models/roleDetails.model');
// jest.mock('../models/permissions.model');
//
// describe('Roles Controller', () => {
//     let req, res;
//
//     beforeEach(() => {
//         req = {
//             params: {},
//             body: {},
//             query: {},
//         };
//         res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//         };
//     });
//
//     afterEach(() => {
//         jest.clearAllMocks();
//     });
//
//     it('should get roles', async () => {
//         // Mock data
//         const mockRoles = {
//             rows: [{ id: 1, name: 'Admin', description: 'Admin role' }],
//             count: 1,
//         };
//         rolesModel.findAndCountAll.mockResolvedValue(mockRoles);
//
//         // Call the function with the mocked request and response objects
//         await getRoles(req, res);
//
//         // Check that the function behaves as expected
//         expect(res.status).toHaveBeenCalledWith(200);
//         expect(res.json).toHaveBeenCalledWith({
//             roles: { ...mockRoles, count: mockRoles.rows.length },
//             options: {
//                 page: 1,
//                 limit: 10,
//                 paginate: 10,
//                 order: ['id', 'ASC'],
//             },
//         });
//     });
//
//     // Add more tests for the other functions here...
// });