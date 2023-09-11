export const symbols = {
  userModuleConfig: Symbol('userModuleConfig'),
  userMapper: Symbol('userMapper'),
  userRepository: Symbol('userRepository'),
  hashService: Symbol('hashService'),
  tokenService: Symbol('tokenService'),
  userHttpController: Symbol('userHttpController'),
  registerUserCommandHandler: Symbol('registerUserCommandHandler'),
  loginUserCommandHandler: Symbol('loginUserCommandHandler'),
  deleteUserCommandHandler: Symbol('deleteUserCommandHandler'),
  findUserQueryHandler: Symbol('findUserQueryHandler'),
};

export const userSymbols = {
  userHttpController: symbols.userHttpController,
  tokenService: symbols.tokenService,
};
