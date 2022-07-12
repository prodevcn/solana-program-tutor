use anchor_lang::prelude::*;
use anchor_spl::token::TokenAccount;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod solana_program_tutor {
    use super::*;

    pub fn set_data(ctx: Context<SetData>, data:u64) -> Result<()> {
      if ctx.accounts.token_account.amount > 0 {
        ctx.accounts.my_account.data = data;
      }
      Ok(())
    }
}

#[derive(Accounts)]
pub struct SetData<'info> {
  #[account(mut)]
  pub my_account: Account<'info, MyAccount>,
  #[account(constraint = my_account.mint == token_account.mint, has_one = owner)]
  pub token_account: Account<'info, TokenAccount>,
  pub owner: Signer<'info>
}

#[account]
#[derive(Default)]
pub struct MyAccount {
  data: u64,
  mint: Pubkey
}
