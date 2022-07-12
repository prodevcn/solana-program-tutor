import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SolanaProgramTutor } from "../target/types/solana_program_tutor";
import assert from "assert";

const { SystemProgram } = anchor.web3;

describe("solana-program-tutor", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace
    .SolanaProgramTutor as Program<SolanaProgramTutor>;

  it("Creates a counter", async() => {
    const baseAccount = anchor.web3.Keypair.generate();
    
    await program.rpc.create({
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    });

    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('Count 0:', account.count.toString());
    assert.ok(account.count.toString() == 0);
    _baseAccount = baseAccount;
  });

  it("Increments the counter", async () => {
    const baseAccount = _baseAccount;
    
    await program.rpc.increment({
      accounts: {
        baseAccount: baseAccount.publicKey,
      },
    });

    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('Count 1: ', account.count.toString());
    assert.ok(account.count.toString() == 1);
  })
});
