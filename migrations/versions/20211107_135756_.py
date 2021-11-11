"""empty message

Revision ID: e72114eb6182
Revises: dd51c1db326a
Create Date: 2021-11-07 13:57:56.140537

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e72114eb6182'
down_revision = 'dd51c1db326a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('notes', sa.Column('createdAt', sa.DateTime(), nullable=True))
    op.add_column('notes', sa.Column('updatedAt', sa.DateTime(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('notes', 'updatedAt')
    op.drop_column('notes', 'createdAt')
    # ### end Alembic commands ###