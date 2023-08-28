import { AddBlockToBlockchainCommandHandler } from './addBlockToBlockchainCommandHandler.js';
import {
  AddBlockToBlockchainCommandHandlerPayload,
  addBlockToBlockchainCommandHandlerPayloadSchema,
} from './payloads/addBlockToBlockchainCommandHandlerPayload.js';
import { Inject, Injectable } from '../../../../libs/dependencyInjection/decorators.js';
import { loggerModuleSymbols } from '../../../../libs/logger/loggerModuleSymbols.js';
import { LoggerService } from '../../../../libs/logger/services/loggerService/loggerService.js';
import { Validator } from '../../../../libs/validator/validator.js';
import { blockchainModuleSymbols } from '../../../blockchainModuleSymbols.js';
import { Block } from '../../../domain/valueObjects/block/block.js';
import { GenesisBlockService } from '../../../domain/services/genesisBlockService/genesisBlockService.js';
import { BlockchainRepository } from '../../repositories/blockchainRepository/blockchainRepository.js';
import {
  AddBlockToBlockchainCommandHandlerResult,
  addBlockToBlockchainCommandHandlerResultSchema,
} from './payloads/addBlockToBlockchainCommandHandlerResult.js';
import { BlockchainNotFoundError } from '../../errors/blockchainNotFoundError.js';

@Injectable()
export class AddBlockToBlockchainCommandHandlerImpl implements AddBlockToBlockchainCommandHandler {
  public constructor(
    @Inject(blockchainModuleSymbols.blockchainRepository)
    private readonly blockRepository: BlockchainRepository,
    @Inject(blockchainModuleSymbols.genesisBlockService)
    private readonly genesisBlockService: GenesisBlockService,
    @Inject(loggerModuleSymbols.loggerService)
    private readonly loggerService: LoggerService,
  ) {}

  public async execute(
    input: AddBlockToBlockchainCommandHandlerPayload,
  ): Promise<AddBlockToBlockchainCommandHandlerResult> {
    const { blockData } = Validator.validate(addBlockToBlockchainCommandHandlerPayloadSchema, input);

    const blockchain = await this.blockRepository.findBlockchain();

    if (!blockchain) {
      throw new BlockchainNotFoundError();
    }

    this.loggerService.debug({ message: 'Adding block to the blockchain...', context: { blockData } });

    blockchain.addBlock(this.genesisBlockService, blockData);

    await this.blockRepository.saveBlockchain({ blockchain });

    const blocks = blockchain.getBlocks();

    this.loggerService.info({
      message: 'Block added to the blockchain.',
      context: { blockIndex: (blocks.at(-1) as Block).index },
    });

    return Validator.validate(addBlockToBlockchainCommandHandlerResultSchema, { blocks });
  }
}
